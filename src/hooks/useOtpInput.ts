import { useState, useCallback, useMemo } from "react";
import { TextInput } from "react-native";

interface UseOtpInputReturn {
  otp: string[];
  setOtp: (otp: string[]) => void;
  handleChange: (value: string, index: number) => void;
  handleKeyPress: (key: string, index: number) => void;
  inputRefs: React.RefObject<TextInput>[];
  isOtpComplete: boolean;
  clearOtp: () => void;
}

/**
 * React Native OTP Hook
 * - Supports 6-digit OTP
 * - Auto focus next input
 * - Backspace focus previous
 * - Numeric only
 */
export const useOtpInput = (length: number = 6): UseOtpInputReturn => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

  // Create refs for each input
  const inputRefs = useMemo(
    () =>
      Array.from({ length }, () =>
        ({ current: null } as React.RefObject<TextInput>)
      ),
    [length]
  );

  /* ---------------------------------------
     Handle digit input
  ---------------------------------------- */
  const handleChange = useCallback(
    (value: string, index: number) => {
      if (!/^\d?$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move forward
      if (value && index < length - 1) {
        inputRefs[index + 1]?.current?.focus();
      }
    },
    [otp, inputRefs, length]
  );

  /* ---------------------------------------
     Handle backspace navigation
  ---------------------------------------- */
  const handleKeyPress = useCallback(
    (key: string, index: number) => {
      if (key === "Backspace" && otp[index] === "" && index > 0) {
        inputRefs[index - 1]?.current?.focus();
      }
    },
    [otp, inputRefs]
  );

  /* ---------------------------------------
     Derived state
  ---------------------------------------- */
  const isOtpComplete = useMemo(
    () => otp.every((digit) => digit !== ""),
    [otp]
  );

  const clearOtp = useCallback(() => {
    setOtp(Array(length).fill(""));
    inputRefs[0]?.current?.focus();
  }, [length, inputRefs]);

  return {
    otp,
    setOtp,
    handleChange,
    handleKeyPress,
    inputRefs,
    isOtpComplete,
    clearOtp,
  };
};

export default useOtpInput;
