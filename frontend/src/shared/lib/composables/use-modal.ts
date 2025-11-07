import { ref, readonly } from "vue";

export const useModal = <
  OpenArgs extends any[] = any[],
  CloseArgs extends any[] = any[],
>(
  initialValue = false,
  options?: Partial<{
    onOpen: (...args: OpenArgs) => void;
    onClose: (...args: CloseArgs) => void;
  }>,
) => {
  const { onOpen = () => {}, onClose = () => {} } = options || {};

  const visible = ref(initialValue);

  const open = (...args: OpenArgs) => {
    visible.value = true;
    onOpen(...args);
  };

  const close = (...args: CloseArgs) => {
    visible.value = false;
    onClose(...args);
  };

  return {
    visible: readonly(visible),
    open,
    close,
  };
};
