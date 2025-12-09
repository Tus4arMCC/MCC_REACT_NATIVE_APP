import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import { carouselStyles as styles, SCREEN_WIDTH } from "../custonCSS/components/AutoCarousel.styles";
import { ImageSourcePropType } from "react-native";
import { Images } from "../assets/images";


/* ---------- Types ---------- */
type Slide = {
  id: number;
  title?: string;
  description?: string;
  image: ImageSourcePropType; // ✅ local or remote
};

interface Props {
  slides?: Slide[];
  height?: number;
  intervalMs?: number;
}

/* ---------- Default Slides ---------- */
const DEFAULT_SLIDES: Slide[] = [
  { id: 1, image: Images.banner1 },
  { id: 2, image: Images.banner2 },
  { id: 3, image: Images.banner1 },
  { id: 4, image: Images.banner2 },
];

export default function AutoCarousel({
  slides = DEFAULT_SLIDES,
  height = 220,
  intervalMs = 3000,
}: Props) {
  /*
    Clone slides for infinite looping:
    [last, ...real, first]
  */
  const realSlides = slides.length ? slides : DEFAULT_SLIDES;
  const loopSlides =
    realSlides.length > 1
      ? [realSlides[realSlides.length - 1], ...realSlides, realSlides[0]]
      : realSlides;

  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(realSlides.length > 1 ? 1 : 0);

  /* ---------- Autoplay ---------- */
  useEffect(() => {
    if (realSlides.length <= 1) return;

    const timer = setInterval(() => {
      scrollRef.current?.scrollTo({
        x: (index + 1) * SCREEN_WIDTH,
        animated: true,
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [index, intervalMs]);

  /* ---------- Infinite Loop Fix ---------- */
  const handleScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const page = Math.round(
      e.nativeEvent.contentOffset.x / SCREEN_WIDTH
    );

    if (page === 0) {
      scrollRef.current?.scrollTo({
        x: realSlides.length * SCREEN_WIDTH,
        animated: false,
      });
      setIndex(realSlides.length);
    } else if (page === loopSlides.length - 1) {
      scrollRef.current?.scrollTo({
        x: SCREEN_WIDTH,
        animated: false,
      });
      setIndex(1);
    } else {
      setIndex(page);
    }
  };

  /* ---------- Active Dot ---------- */
  const activeDot =
    index === 0
      ? realSlides.length - 1
      : index === loopSlides.length - 1
      ? 0
      : index - 1;

  return (
    <View style={[styles.container, { height }]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        contentOffset={{ x: SCREEN_WIDTH, y: 0 }}
      >
        {loopSlides.map((slide, i) => (
          <View key={`${slide.id}-${i}`} style={[styles.slide, { height }]}>
            <Image source={slide.image} style={styles.image} />

            {(slide.title || slide.description) && (
              <View style={styles.captionBox}>
                {slide.title && (
                  <Text style={styles.captionTitle}>
                    {slide.title}
                  </Text>
                )}
                {slide.description && (
                  <Text style={styles.captionText}>
                    {slide.description}
                  </Text>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Dots */}
      <View style={styles.dotsWrapper}>
        {realSlides.map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.dot,
              i === activeDot && styles.dotActive,
            ]}
            onPress={() =>
              scrollRef.current?.scrollTo({
                x: (i + 1) * SCREEN_WIDTH,
                animated: true,
              })
            }
          />
        ))}
      </View>
    </View>
  );
}
