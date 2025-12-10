import React, { useMemo, useRef, useState } from "react";
import { FlatList, Pressable, Dimensions } from "react-native";
import { Text, YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";

import ProductCard from "./ProductCard";
import { styles } from "../custonCSS/components/SectionCarousel.styles";

/* =======================
   Types
   ======================= */

interface SectionCarouselProps {
  products: any[];
  sectionTag: string;
  cardMinWidth?: number;
}

/* =======================
   Component
   ======================= */

const SectionCarousel = ({
  products,
  sectionTag,
  cardMinWidth = 250,
}: SectionCarouselProps) => {
  const listRef = useRef<FlatList>(null);
  const screenWidth = Dimensions.get("window").width;

  /* how many cards fit on screen */
  const itemsPerView = Math.max(
    1,
    Math.floor(screenWidth / cardMinWidth)
  );

  const itemWidth = screenWidth / itemsPerView;

  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const canLeft = currentIndex > 0;
  const canRight = currentIndex < maxIndex;

  /* Scroll handler */
  const handleScroll = (direction: "left" | "right") => {
    const nextIndex =
      direction === "right"
        ? Math.min(currentIndex + itemsPerView, maxIndex)
        : Math.max(currentIndex - itemsPerView, 0);

    setCurrentIndex(nextIndex);

    listRef.current?.scrollToIndex({
      index: nextIndex,
      animated: true,
    });
  };

  if (!products || products.length === 0) return null;

  return (
    <YStack style={styles.wrapper}>
      <Text style={styles.title}>{sectionTag}</Text>

      {/* LEFT ARROW */}
      <Pressable
        disabled={!canLeft}
        onPress={() => handleScroll("left")}
        style={[
          styles.navBtn,
          styles.navLeft,
          !canLeft && styles.disabled,
        ]}
      >
        <Ionicons name="chevron-back" size={22} />
      </Pressable>

      {/* RIGHT ARROW */}
      <Pressable
        disabled={!canRight}
        onPress={() => handleScroll("right")}
        style={[
          styles.navBtn,
          styles.navRight,
          !canRight && styles.disabled,
        ]}
      >
        <Ionicons name="chevron-forward" size={22} />
      </Pressable>

      {/* PRODUCT LIST */}
      <FlatList
        ref={listRef}
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, idx) => `${sectionTag}-${idx}`}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        renderItem={({ item }) => {
          const primaryImage =
            item?.images?.find((img: any) => img.primary)?.image ||
            item?.images?.[0]?.image ||
            "";

          return (
            <YStack
              style={[
                styles.itemWrapper,
                { width: itemWidth },
              ]}
            >
              <ProductCard
                tag={sectionTag}
                productId={String(item.code)}
                image={primaryImage}
                title={item?.product ?? "Unnamed Product"}
                price={item?.price ?? 0}
                mrp={item?.mrp ?? 0}
                discount={item?.discount ?? 0}
                rating={item?.rating ?? 0}
                reviews={item?.reviews ?? 0}
                route={
                  item?.code ? `Product/${item.code}` : undefined
                }
                isFavourite={item?.isFavourite}
                isInCart={item?.isInCart}
              />
            </YStack>
          );
        }}
      />
    </YStack>
  );
};

export default SectionCarousel;
