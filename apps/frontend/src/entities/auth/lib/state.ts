import { reactive, ref } from "vue";
import type { APIUserResponse } from "@/shared/types";

export const INITIAL_FORM_STATE = {
  email: "",
  username: "",
  otp: "",
};

export const form = reactive({ ...INITIAL_FORM_STATE });
export const user = ref<APIUserResponse | null>(null);
