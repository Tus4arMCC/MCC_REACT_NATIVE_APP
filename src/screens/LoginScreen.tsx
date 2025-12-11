import React, { useState } from "react";
import { YStack, XStack, Input, Button, Text, Spinner } from "tamagui";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useAppToast } from "../hooks/useAppToast";


import LoginData from "../data/LoginData";
import { setUserInfo } from "../store/authSlice";

import { saveAuthToStorage, saveUserId } from "../utilits/authStorage";
import { resolveUid } from "../utilits/storageUtils";

import { getRedirectAfterLogin } from "../utilits/redirectAfterLogin";
import { syncCartWishlistWithCounts } from "../api/syncCartWishlist";

import PKSOFT_URLS from "../utilits/Pk_api_Urls";

export default function LoginScreen() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const { showSuccessToast, showErrorToast } = useAppToast();
  const [form, setForm] = useState<LoginData>({
    username: "",
    password: "",
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goRegister = () => navigation.navigate("Register" as never);
  const goForget = () => navigation.navigate("ForgetPassword" as never);

  /* ----------------------- INPUT HANDLER ----------------------- */
  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  /* ----------------------- VALIDATION ----------------------- */
  const validate = () => {
    const errors: { [key: string]: string } = {};

    if (!form.username.trim()) errors.username = "Username is required.";
    if (!form.password.trim()) errors.password = "Password is required.";

    return errors;
  };

  /* ----------------------- SUBMIT ----------------------- */
  const handleSubmit = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSaving(true);

    try {
      const response = await axios.post(PKSOFT_URLS.CUSTOMER.LOGIN, form);

      const data = response.data?.data;
      if (!data?.token) {
        showErrorToast(response.data?.message || "Invalid login.");
        return;
      }

      const { token, pksoft_token, userModel } = data;
      const userId = userModel?.code;

      /* SAVE AUTH IN SECURE STORAGE */
      await saveAuthToStorage(token, pksoft_token, userModel?.name || "", userId);
      await saveUserId(userId);
      await resolveUid(); // remove guest/random userId

      /* SYNC CART/WISHLIST */
      try {
        await syncCartWishlistWithCounts(userId, "user");
      } catch (err) {
        //console.log("SYNC ERROR:", err);
      }

      /* UPDATE REDUX */
      dispatch(
        setUserInfo({
          username: userModel?.name,
          userid: userId,
          user_id: userId,
          token,
          pksoft_token,
        })
      );

      showSuccessToast("Login Successful!");

      const redirectPath = getRedirectAfterLogin();
      navigation.navigate(redirectPath as never);

    } catch (error: any) {
      showErrorToast(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  /* ----------------------- UI ----------------------- */
  return (
    <YStack flex={1} justifyContent="center" px="$4">
      <YStack bg="$color1" p="$5" br="$4" shadowColor="black" shadowRadius={8}>
        <Text fontSize="$7" fontWeight="700" textAlign="center" mb="$4">
          Login
        </Text>

        {/* USERNAME */}
        <YStack mb="$3">
          <Text mb="$1">Username *</Text>
          <Input
            value={form.username}
            onChangeText={(v: any) => handleChange("username", v)}
            placeholder="Enter Username"
            borderColor={errors.username ? "red" : "$borderColor"}
          />
          {errors.username && (
            <Text color="red" fontSize="$2">
              {errors.username}
            </Text>
          )}
        </YStack>

        {/* PASSWORD */}
        <YStack mb="$4">
          <Text mb="$1">Password *</Text>

          <XStack ai="center" jc="space-between">
            <Input
              flex={1}
              secureTextEntry={!showPassword}
              value={form.password}
              onChangeText={(v: any) => handleChange("password", v)}
              placeholder="Enter Password"
              borderColor={errors.password ? "red" : "$borderColor"}
            />

            <Button
              ml="$2"
              onPress={() => setShowPassword(!showPassword)}
              size="$3"
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </XStack>

          {errors.password && (
            <Text color="red" fontSize="$2">
              {errors.password}
            </Text>
          )}
        </YStack>

        {/* SUBMIT BUTTON */}
        <Button
          size="$5"
          bg="$blue10"
          color="white"
          onPress={handleSubmit}
          disabled={isSaving}
        >
          {isSaving ? (
            <XStack ai="center" space="$2">
              <Spinner size="small" color="white" />
              <Text color="white">Logging in...</Text>
            </XStack>
          ) : (
            "Login"
          )}
        </Button>

        {/* LINKS */}
        <XStack jc="space-between" mt="$4">
          <Text
            color="$blue10"
            onPress={goRegister}
            tt="none"
          >
            I don't have an account
          </Text>

          <Text
            color="$blue10"
            onPress={goForget}
            tt="none"
          >
            Forget Password →
          </Text>
        </XStack>
      </YStack>
    </YStack>
  );
}
