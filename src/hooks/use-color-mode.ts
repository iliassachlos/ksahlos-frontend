import { toggleColorMode } from "../store/slices/ui-slice";
import { useAppDispatch, useAppSelector } from "../store/store";

export const useColorMode = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.ui.colorMode);

  return {
    mode,
    toggleColorMode: () => dispatch(toggleColorMode()),
  };
};
