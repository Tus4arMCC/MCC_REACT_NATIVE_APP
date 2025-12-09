import React, { useEffect, useMemo } from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  runOnJS,
} from "react-native-reanimated";
import { YStack } from "tamagui";

import { styles } from "../custonCSS/components/UltraFancyLikeButton.styles";

/* =======================
   Types (RN-friendly)
   ======================= */

interface UltraFancyLikeButtonProps {
  liked: boolean;
  onPress: () => void;     // ✅ renamed from onClick
  size?: number;
  sparkleCount?: number;
}

/* =======================
   Component
   ======================= */

const UltraFancyLikeButton = ({
  liked,
  onPress,
  size = 50,
  sparkleCount = 10,
}: UltraFancyLikeButtonProps) => {
  const scale = useSharedValue(1);

  /* Heart pop animation */
  useEffect(() => {
    scale.value = withSequence(
      withTiming(liked ? 1.4 : 1, { duration: 200 }),
      withTiming(1, { duration: 200 })
    );
  }, [liked]);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  /* =======================
     Sparkles
     ======================= */

  const sparkles = useMemo(() => {
    return Array.from({ length: sparkleCount }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 20 + Math.random() * 20;

      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      };
    });
  }, [sparkleCount, liked]);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { width: size, height: size }]}
    >
      {/* Heart */}
      <Animated.View style={[styles.heartWrapper, heartStyle]}>
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={size * 0.6}
          color="red"
        />
      </Animated.View>

      {/* Sparkles */}
      {liked &&
        sparkles.map((sparkle, index) => {
          const translateX = useSharedValue(0);
          const translateY = useSharedValue(0);
          const opacity = useSharedValue(1);
          const sparkleScale = useSharedValue(1);

          useEffect(() => {
            translateX.value = withTiming(sparkle.x, { duration: 600 });
            translateY.value = withTiming(sparkle.y, { duration: 600 });
            sparkleScale.value = withTiming(0, { duration: 600 });
            opacity.value = withTiming(0, { duration: 600 });
          }, []);

          const sparkleStyle = useAnimatedStyle(() => ({
            transform: [
              { translateX: translateX.value },
              { translateY: translateY.value },
              { scale: sparkleScale.value },
            ],
            opacity: opacity.value,
          }));

          return (
            <Animated.View
              key={index}
              style={[
                styles.sparkle,
                sparkleStyle,
                {
                  top: size / 2 - 3,
                  left: size / 2 - 3,
                },
              ]}
            />
          );
        })}
    </Pressable>
  );
};

export default UltraFancyLikeButton;
