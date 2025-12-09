import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";

/* -------------------------------------------------------
   Context Type
------------------------------------------------------- */
interface LoadingContextType {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

/* -------------------------------------------------------
   Context
------------------------------------------------------- */
const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

/* -------------------------------------------------------
   Provider
------------------------------------------------------- */
export const LoadingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoading: setIsLoading,
      }}
    >
      {children}

      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.text}>Please wait...</Text>
        </View>
      )}
    </LoadingContext.Provider>
  );
};

/* -------------------------------------------------------
   Hook
------------------------------------------------------- */
export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error(
      "useLoading must be used inside LoadingProvider"
    );
  }
  return ctx;
};

/* -------------------------------------------------------
   Styles
------------------------------------------------------- */
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  text: {
    marginTop: 12,
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
