import React, { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { Text } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Pressable } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { useCart } from "../hooks/useCart";
import { addToCartAPI, removeFromCartAPI } from "../api/cartApi";
import { setCartCount } from "../store/apiCountsSlice";
import { styles } from "../custonCSS/components/AnimatedCartButton.styles";

/* =======================
   Types
   ======================= */

interface AnimatedCartButtonProps {
  productId: string;
  qty?: number;
  onAdded?: () => void;
  onRemoved?: () => void;
  initialInCart?: boolean;
}

/* =======================
   Component
   ======================= */

const AnimatedCartButton = ({
  productId,
  qty = 1,
  onAdded,
  onRemoved,
  initialInCart,
}: AnimatedCartButtonProps) => {
  const { isInCart, addToCart, removeFromCart } = useCart();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.auth.userInfo);

  /* Memoized cart check */
  const inCart = useMemo(
    () => isInCart(productId),
    [isInCart, productId]
  );

  const [displayInCart, setDisplayInCart] = useState<boolean>(
    typeof initialInCart === "boolean" ? initialInCart : inCart
  );

  useEffect(() => {
    setDisplayInCart(inCart);
  }, [inCart]);

  const [animating, setAnimating] = useState(false);

  /* =======================
     Animations
     ======================= */

  const shakeX = useSharedValue(0);
  const flyX = useSharedValue(0);
  const flyOpacity = useSharedValue(1);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const flyStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: flyX.value }],
    opacity: flyOpacity.value,
  }));

  const startShake = () => {
    shakeX.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 80 }),
        withTiming(3, { duration: 80 })
      ),
      3,
      true
    );
  };

  const startFly = () => {
    flyX.value = withTiming(100, { duration: 600 });
    flyOpacity.value = withTiming(0, { duration: 600 });
  };

  /* =======================
     Handlers
     ======================= */

  const handleAdd = async () => {
    setAnimating(true);
    startFly();

    const result = await addToCartAPI(productId);

    setTimeout(() => {
      if (result.success) {
        addToCart(productId, qty);

        if (
          (userInfo?.user_id || userInfo?.guest_id) &&
          result.count !== undefined
        ) {
          dispatch(setCartCount(result.count));
        }

        onAdded?.();
      }
      setAnimating(false);
      flyX.value = 0;
      flyOpacity.value = 1;
    }, 600);
  };

  const handleRemove = () => {
    Alert.alert(
      "Remove from Cart?",
      "Do you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            const apiResult = await removeFromCartAPI(productId);
            if (apiResult.success) {
              removeFromCart(productId);

              if (
                (userInfo?.user_id || userInfo?.guest_id) &&
                apiResult.count !== undefined
              ) {
                dispatch(setCartCount(apiResult.count));
              }

              onRemoved?.();
            }
          },
        },
      ]
    );
  };

  const handlePress = () => {
    if (displayInCart) handleRemove();
    else handleAdd();
  };

  /* =======================
     Render
     ======================= */

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={!displayInCart ? startShake : undefined}
      style={[
        styles.button,
        displayInCart ? styles.secondary : styles.danger,
      ]}
    >
      <Animated.View style={[styles.iconWrapper, !animating && shakeStyle]}>
        {!animating && (
          <Ionicons name="cart-outline" size={20} color="#fff" />
        )}

        {animating && (
          <Animated.View style={flyStyle}>
            <Ionicons name="cart-outline" size={20} color="#fff" />
          </Animated.View>
        )}
      </Animated.View>

      <Text style={styles.text}>
        {displayInCart ? "Remove from Cart" : "Add to Cart"}
      </Text>
    </Pressable>
  );
};

export default AnimatedCartButton;
