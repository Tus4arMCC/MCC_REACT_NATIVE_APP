import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  Animated,
} from "react-native";
import { YStack, XStack } from "tamagui";

import { styles } from "../custonCSS/skeleton/CenteredCategorySkeleton.styles";

/*
  CenteredCategorySkeleton
  ------------------------
  ✅ Horizontal scroll
  ✅ Skeleton shimmer animation
  ✅ Tamagui layout
*/

const SKELETON_COUNT = 8;

const CenteredCategorySkeleton = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  /* Shimmer loop animation */
  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const shimmerColor = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#d84141ff", "#da3535ff"],
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <XStack>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <YStack key={i} style={styles.card}>
            <Animated.View
              style={[
                styles.imageSkeleton,
                { backgroundColor: shimmerColor },
              ]}
            />
            <Animated.View
              style={[
                styles.textSkeleton,
                { backgroundColor: shimmerColor },
              ]}
            />
          </YStack>
        ))}
      </XStack>
    </ScrollView>
  );
};

export default CenteredCategorySkeleton;
