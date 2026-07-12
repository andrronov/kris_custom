import { ref, computed } from "vue";
import {
  useStorage,
  type RemovableRef,
  StorageSerializers,
  useDebounceFn,
} from "@vueuse/core";
import { defineStore } from "pinia";
import type { ProductWithImages } from "@kris-customs/shared/types";
import { useAppStore } from "@/shared/stores/application";
import { api } from "@/shared/api";
import {
  isDefined,
  getStorageKey,
  createAsyncProcess,
} from "@/shared/lib/utils";
import type { APIUserResponse } from "@/shared/types";
import { USKV_BINDINGS } from "../config";

export const useUserStore = defineStore("user", () => {
  const appStore = useAppStore();

  const user: RemovableRef<APIUserResponse | undefined> = useStorage(
    getStorageKey("user"),
    null,
    undefined,
    { serializer: StorageSerializers.object },
  );

  const authorized = computed(() => isDefined(user.value));

  const profileFetched = ref(false);
  const {
    run: fetchProfile,
    loading: fetchingProfile,
    error: fetchingProfileError,
  } = createAsyncProcess(async () => {
    const res = await api.getProfile();

    const [data, error] = res;

    if (error) {
      logout();
      throw error;
    }

    user.value = data;
    profileFetched.value = true;

    return res;
  });

  const favorites = useStorage(
    getStorageKey("user-favorites"),
    new Set<string>(),
  );
  const favoriteProductsMap = ref<Map<string, ProductWithImages>>(new Map());
  const favoriteProducts = computed(() => {
    return Array.from(favorites.value)
      .map((id) => favoriteProductsMap.value.get(id))
      .filter((product) => isDefined(product));
  });

  const fetchFavorites = async () => {
    const [data, error] = await api.getKVNamespace(
      USKV_BINDINGS.name.favorites,
    );
    if (!error && data) {
      favorites.value = new Set(data);
    }
  };

  const { run: fetchFavoriteProducts, loading: fetchingFavoriteProducts } =
    createAsyncProcess(async () => {
      if (favorites.value.size === 0) return;

      const missing = Array.from(favorites.value).filter(
        (id) => !favoriteProductsMap.value.has(id),
      );
      if (missing.length === 0) return;

      const [data, error] = await api.getProductsById(missing);
      if (error || !data) return [];

      data.forEach((product) => {
        favoriteProductsMap.value.set(product.id, product);
      });
    });

  const debouncedToggleKv = useDebounceFn(async () => {
    await api.setKVNamespace(
      USKV_BINDINGS.name.favorites,
      Array.from(favorites.value),
    );
  }, 2000);
  const toggleFavorite = async (productId: string) => {
    if (favorites.value.has(productId)) {
      favorites.value.delete(productId);
      favoriteProductsMap.value.delete(productId);
    } else {
      favorites.value.add(productId);
    }

    debouncedToggleKv();
  };

  const { run: syncSettings, loading: syncingSettings } = createAsyncProcess(
    async () => {
      const [settingsKV] = await api.getKVNamespace(
        USKV_BINDINGS.name.settings,
      );

      if (settingsKV) {
        appStore.lang = settingsKV.language;
        appStore.storedTheme = settingsKV.theme;
      } else {
        await api.setKVNamespace(USKV_BINDINGS.name.settings, {
          language: appStore.lang,
          theme: appStore.storedTheme,
        });
      }
    },
  );

  const sync = async () => {
    await Promise.allSettled([
      fetchProfile(),
      syncSettings(),
      fetchFavorites(),
    ]);
  };

  const login = async () => {
    await fetchProfile();
    await syncSettings();
    await fetchFavorites();
  };

  const logout = () => {
    user.value = null;
    profileFetched.value = false;
    favorites.value.clear();
    favoriteProductsMap.value.clear();
    api.logout();
  };

  return {
    user,
    profileFetched,
    authorized,

    favorites,
    favoriteProducts,
    fetchFavorites,
    toggleFavorite,
    fetchFavoriteProducts,
    fetchingFavoriteProducts,

    syncSettings,
    syncingSettings,
    sync,

    fetchProfile,
    fetchingProfile,
    fetchingProfileError,

    login,
    logout,
  };
});
