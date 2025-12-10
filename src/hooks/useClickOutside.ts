import { Keyboard } from "react-native";

/**
 * React Native replacement for useClickOutside
 * Usage: call when backdrop is pressed
 */
export const useOutsidePress = (onOutsidePress: () => void) => {
  const handleOutsidePress = () => {
    Keyboard.dismiss();
    onOutsidePress();
  };

  return { handleOutsidePress };
};
