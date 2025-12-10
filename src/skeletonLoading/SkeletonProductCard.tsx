import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { YStack } from "tamagui";

import { styles } from "../custonCSS/skeleton/SkeletonProductCard.styles";

/*
  SkeletonProductCard
  -------------------
  ✅ Native shimmer animation
  ✅ Mobile-safe
  ✅ Same structure as real product card
*/

const SkeletonProductCard = () => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1300,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const bgColor = shimmer.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["#e6e6e6", "#f5f5f5", "#e6e6e6"],
  });

  const Skeleton = ({ style }: { style: any }) => (
    <Animated.View
      style={[
        styles.skeleton,
        style,
        { backgroundColor: bgColor },
      ]}
    />
  );

  return (
    <YStack marginVertical="$2">
      <YStack style={styles.card}>
        {/* Wishlist placeholder */}
        <Skeleton style={styles.wishlist} />

        {/* Image */}
        <Skeleton style={styles.image} />

        {/* Title */}
        <Skeleton style={styles.text} />

        {/* Price */}
        <Skeleton style={styles.price} />

        {/* MRP */}
        <Skeleton style={styles.small} />

        {/* Add to cart */}
        <Skeleton style={styles.button} />
      </YStack>
    </YStack>
  );
};

export default SkeletonProductCard;
