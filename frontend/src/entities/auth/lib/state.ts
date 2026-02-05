import { reactive } from "vue";

export const INITIAL_FORM_STATE = {
  email: "",
  username: "",
  otp: "",
};

export const form = reactive({ ...INITIAL_FORM_STATE });
