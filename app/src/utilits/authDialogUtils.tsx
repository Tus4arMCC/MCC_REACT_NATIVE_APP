import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export interface AuthDialogOptions {
  onContinueAsGuest: () => void;
  onUserRegistration: () => void;
  onAlreadyHaveAccount: () => void;
  visible: boolean;
  onClose: () => void;
}

/**
 * React Native Auth Verification Dialog
 */
export const AuthVerificationDialog = ({
  visible,
  onClose,
  onContinueAsGuest,
  onUserRegistration,
  onAlreadyHaveAccount,
}: AuthDialogOptions) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.icon}>⚠️</Text>
          <Text style={styles.title}>User Not Verified</Text>

          <Text style={styles.description}>
            Please select an option to continue:
          </Text>

          <TouchableOpacity
            style={[styles.button, styles.guestBtn]}
            onPress={() => {
              onClose();
              onContinueAsGuest();
            }}
          >
            <Text style={styles.btnText}>Continue as Guest</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.registerBtn]}
            onPress={() => {
              onClose();
              onUserRegistration();
            }}
          >
            <Text style={styles.btnText}>Create New Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onClose();
              onAlreadyHaveAccount();
            }}
          >
            <Text style={styles.loginLink}>
              Already have an account? Sign In Here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "85%",
    alignItems: "center",
  },
  icon: {
    fontSize: 32,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: "center",
  },
  guestBtn: {
    backgroundColor: "#ff3f6c",
  },
  registerBtn: {
    backgroundColor: "#6c757d",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  loginLink: {
    marginTop: 16,
    fontSize: 13,
    color: "#ff3f6c",
    fontWeight: "600",
  },
});
