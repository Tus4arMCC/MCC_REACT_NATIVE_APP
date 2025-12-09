import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { ReactNode } from "react";

export function AppToastProvider({ children }: { children: ReactNode }) {
  return (
    <ToastProvider swipeDirection="horizontal" duration={2000}>
      {children}
      <ToastViewport
        top={50}
        left={0}
        right={0}
        flexDirection="column"
        alignItems="center"
      />
    </ToastProvider>
  );
}
