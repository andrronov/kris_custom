import { useUserStore } from "@/shared/stores/user";

export const logout = () => {
  const userStore = useUserStore();
  userStore.logout();
};
