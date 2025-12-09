import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";

import reviews, { Review } from "../data/reviews";
import { styles } from "../custonCSS/components/ReviewCarousel.styles";

/*
  ReviewCarousel
  ---------------
  ✅ Same slide logic (chunking)
  ✅ Native navigation
  ✅ Mobile-safe buttons
*/

const ReviewCarousel = () => {
  const chunkSize = 3;
  const slides: Review[][] = [];

  for (let i = 0; i < reviews.length; i += chunkSize) {
    slides.push(reviews.slice(i, i + chunkSize));
  }

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      setActiveIndex(activeIndex + 1);
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

      <View style={styles.row}>
        {slides[activeIndex].map((review) => (
          <View key={review.id} style={styles.card}>
            {/* Stars */}
            <View style={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Ionicons
                  key={i}
                  name="star"
                  size={18}
                  color={i < review.rating ? "#ffc107" : "#ddd"}
                />
              ))}
            </View>

            <Text fontWeight="700">“{review.title}”</Text>
            <Text color="#777" marginTop={6}>
              {review.description}
            </Text>

            <Text style={styles.readMore}>Read More &gt;</Text>

            <View style={styles.authorRow}>
              <View style={styles.avatar} />
              <View>
                <Text fontWeight="700">{review.name}</Text>
                <Text color="#777" fontSize={12}>
                  {review.location}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Arrows */}
      <View style={styles.arrows}>
        <TouchableOpacity
          onPress={handlePrev}
          disabled={activeIndex === 0}
          style={[
            styles.arrowBtn,
            activeIndex === 0 && styles.disabledArrow,
          ]}
        >
          <Ionicons name="chevron-back" color="#fff" size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={activeIndex === slides.length - 1}
          style={[
            styles.arrowBtn,
            activeIndex === slides.length - 1 &&
              styles.disabledArrow,
          ]}
        >
          <Ionicons name="chevron-forward" color="#fff" size={22} />
        </TouchableOpacity>
      </View>
    </YStack>
  );
};

export default ReviewCarousel;
