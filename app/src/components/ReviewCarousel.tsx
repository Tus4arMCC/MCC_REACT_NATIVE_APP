import React, { useRef } from "react";
import {
  View,
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Text, YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import reviews from "../data/reviews";
import { styles } from "../custonCSS/components/ReviewCarousel.styles";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.82;
const SIDE_SPACING = (width - CARD_WIDTH) / 2;

const ReviewCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const lastIndex = useRef(0);

  const onMomentumEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const index = Math.round(
      e.nativeEvent.contentOffset.x / CARD_WIDTH
    );

    if (index !== lastIndex.current) {
      Haptics.selectionAsync(); // ✅ HAPTIC
      lastIndex.current = index;
    }
  };

  return (
    <YStack style={styles.container}>
      <Text style={styles.heading}>
        Loved By Millions Of Happy Customers
      </Text>
      <Text style={styles.subHeading}>
        Heart warming experiences shared by our customers
      </Text>

      <Animated.FlatList
        data={reviews}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{
          paddingHorizontal: SIDE_SPACING,
        }}
        onMomentumScrollEnd={onMomentumEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.95, 1, 0.95],
            extrapolate: "clamp",
          });

          const shadowOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.1, 0.35, 0.1],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[
                styles.card,
                {
                  width: CARD_WIDTH,
                  transform: [{ scale }],
                  shadowOpacity,
                },
              ]}
            >
              {/* Stars */}
              <View style={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Ionicons
                    key={i}
                    name="star"
                    size={18}
                    color={i < item.rating ? "#ffc107" : "#ddd"}
                  />
                ))}
              </View>

              <Text fontWeight="700">“{item.title}”</Text>

              <View style={styles.descriptionBox}>
                <Text color="#777">{item.description}</Text>
              </View>

              <Text style={styles.readMore}>Read More &gt;</Text>

              <View style={styles.authorRow}>
                <View style={styles.avatar} />
                <View>
                  <Text fontWeight="700">{item.name}</Text>
                  <Text color="#777" fontSize={12}>
                    {item.location}
                  </Text>
                </View>
              </View>
            </Animated.View>
          );
        }}
      />
    </YStack>
  );
};

export default ReviewCarousel;
