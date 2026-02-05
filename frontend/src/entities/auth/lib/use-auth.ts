import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/shared/stores/user";
import { nothing, getKeys, createAsyncProcess } from "@/shared/lib/utils";
import { OTP_LEN, USERNAME_LEN } from "@/shared/config";
import { form, INITIAL_FORM_STATE } from "./state";
import { api } from "@/shared/api";
import type { APIError } from "@/shared/types";

export function useAuth(
  onSuccess: () => void = nothing,
  onError: () => void = nothing,
  onFinish: () => void = nothing,
) {
  const { t } = useI18n();
  const userStore = useUserStore();

  const formErrors = ref({
    email: "",
    username: "",
    otp: "",
  });

  const resetFormState = () => Object.assign(form, INITIAL_FORM_STATE);
  const resetFormErrors = () =>
    getKeys(formErrors.value).forEach((key) => (formErrors.value[key] = ""));

  const resetState = () => {
    resetFormState();
    resetFormErrors();
  };

  const formatEmail = (email: string) => email.toLowerCase().trim();
  const formatUsername = (email: string, username?: string) => {
    if (!username) return email.split("@")[0];
    return username.trim();
  };

  const validateEmail = () => {
    const EMAIL_REGEX = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    );
    if (!form.email) {
      formErrors.value.email = t("auth.errors.email_required");
    } else if (!form.email.match(EMAIL_REGEX)) {
      formErrors.value.email = t("auth.errors.email_invalid");
    } else {
      formErrors.value.email = "";
    }
    return !formErrors.value.email;
  };

  const validateUsername = () => {
    if (!form.username) {
      formErrors.value.username = t("auth.errors.username_required");
    } else if (
      form.username.length < USERNAME_LEN.min ||
      form.username.length > USERNAME_LEN.max
    ) {
      formErrors.value.username = t("auth.errors.username_length", {
        min: USERNAME_LEN.min,
        max: USERNAME_LEN.max,
      });
    } else {
      formErrors.value.username = "";
    }
    return !formErrors.value.username;
  };

  const validateOTP = () => {
    console.log(form.otp, form.otp.length);
    if (!form.otp) {
      formErrors.value.otp = t("auth.errors.otp_required");
    } else if (form.otp.length !== OTP_LEN) {
      formErrors.value.otp = t("auth.errors.otp_length", { len: OTP_LEN });
    } else {
      formErrors.value.otp = "";
    }

    return !formErrors.value.otp;
  };

  const errorMessages = new Map([
    [
      "username_required" as string,
      {
        type: "username",
        code: t("auth.errors.username_required"),
      },
    ],
    [
      "email_invalid",
      {
        type: "email",
        code: t("auth.errors.email_invalid"),
      },
    ],
    [
      "otp_send_failed",
      {
        type: "email",
        code: t("auth.errors.otp_send_failed"),
      },
    ],
    [
      "otp_not_found",
      {
        type: "otp",
        code: t("auth.errors.otp_not_found"),
      },
    ],
    [
      "invalid_otp",
      {
        type: "otp",
        code: t("auth.errors.invalid_otp"),
      },
    ],
    [
      "internal_server_error",
      {
        type: "email",
        code: t("auth.errors.internal_server_error"),
      },
    ],
  ] as const);

  const setFormError = (error: APIError) => {
    if (!errorMessages.has(error.message)) {
      return;
    }

    const msg = errorMessages.get(error.message)!;
    formErrors.value[msg.type] = msg.code;
  };

  const {
    run: submitAuth,
    loading: submitting,
    error,
  } = createAsyncProcess(async (resend: boolean = false) => {
    const formattedEmail = formatEmail(form.email);
    form.username = formatUsername(formattedEmail, form.username);

    const emailValid = validateEmail();
    const usernameValid = validateUsername();

    if (!usernameValid || !emailValid) {
      return;
    }

    const [data, error] = await api.sendAuthMail(
      formattedEmail,
      form.username,
      resend || false,
    );

    if (error) {
      onError();
      setFormError(error);
      throw error;
    }

    onSuccess();
  });

  const { run: verifyEmail, loading: verifyingEmail } = createAsyncProcess(
    async () => {
      if (!validateEmail() || !validateOTP()) {
        return;
      }

      const formattedEmail = formatEmail(form.email);

      const [data, error] = await api.verifyEmail(formattedEmail, form.otp);

      if (error) {
        onError();
        setFormError(error);
        throw error;
      }

      userStore.login();
      onSuccess();
      onFinish();
    },
  );

  return {
    form,
    formErrors,
    resetFormState,
    resetFormErrors,
    resetState,
    formatEmail,

    validateEmail,
    validateOTP,
    validateUsername,

    verifyEmail,
    verifyingEmail,

    submitAuth,
    submitting,
  };
}
