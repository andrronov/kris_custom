import { ref, computed } from "vue";
import {
  useStorage,
  type RemovableRef,
  StorageSerializers,
} from "@vueuse/core";
import { defineStore } from "pinia";
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
    await Promise.allSettled([fetchProfile(), syncSettings()]);
  };

  const login = async () => {
    await fetchProfile();
    await syncSettings();
  };

  const logout = () => {
    user.value = null;
    profileFetched.value = false;
    api.logout();
  };

  return {
    user,
    profileFetched,
    authorized,

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
