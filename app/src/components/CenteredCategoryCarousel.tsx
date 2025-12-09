import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ScrollView, View, LayoutChangeEvent } from "react-native";
import { Text, YStack } from "tamagui";
import { useNavigation } from "@react-navigation/native";

import ImagePreview from "./ImagePreview";
import CenteredCategorySkeleton from "../skeletonLoading/CenteredCategorySkeleton";
import { styles } from "../custonCSS/components/CenteredCategoryCarousel.styles";

/* =======================
   Types
   ======================= */

interface CategoryItem {
  [key: string]: any;
}

interface CenteredCategoryCarouselProps {
  apiUrl?: string;
  categories?: CategoryItem[];
  titleKey: string;
  imageKey: string;
  linkKey?: string;
}

/* =======================
   Component
   ======================= */

const CenteredCategoryCarousel = ({
  apiUrl,
  categories = [],
  titleKey,
  imageKey,
  linkKey,
}: CenteredCategoryCarouselProps) => {
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [centerContent, setCenterContent] = useState(true);

  const scrollRef = useRef<ScrollView>(null);
  const contentWidth = useRef(0);
  const containerWidth = useRef(0);

  const navigation = useNavigation<any>();

  /* 🟦 CASE 1: categories passed from parent */
  useEffect(() => {
    if (categories.length > 0) {
      setItems(categories);
      setLoading(false);
    }
  }, [categories]);

  /* 🟩 CASE 2: load via API */
  useEffect(() => {
    if (!apiUrl || categories.length > 0) return;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(apiUrl);
        let data = res.data?.data ?? res.data;
        if (!Array.isArray(data)) data = [];
        setItems(data);
      } catch (err) {
        console.error("Category fetch error:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [apiUrl]);

  /* Overflow logic (same behavior as web) */
  const onContainerLayout = (e: LayoutChangeEvent) => {
    containerWidth.current = e.nativeEvent.layout.width;
    updateCentering();
  };

  const onContentSizeChange = (w: number) => {
    contentWidth.current = w;
    updateCentering();
  };

  const updateCentering = () => {
    setCenterContent(contentWidth.current <= containerWidth.current);
  };

  /* Loader */
  if (loading) {
    return (
      <YStack style={styles.wrapper}>
        <Text style={styles.title}>Shop by Categories</Text>
        <CenteredCategorySkeleton />
      </YStack>
    );
  }

  /* Empty state */
  if (!items.length) {
    return (
      <YStack padding="$5" alignItems="center">
        <Text color="$gray10">No categories found</Text>
      </YStack>
    );
  }

  return (
    <YStack style={styles.wrapper}>
      <Text style={styles.title}>Shop by Categories</Text>

      <View onLayout={onContainerLayout}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={onContentSizeChange}
          contentContainerStyle={[
            styles.scrollContainer,
            centerContent && { justifyContent: "center" },
          ]}
        >
          {items.map((item, index) => {
            const title = item[titleKey] || "Untitled";
            const img = item[imageKey];
            const link = linkKey ? item[linkKey] : null;

            return (
              <YStack
                key={index}
                style={[
                  styles.card,
                  link && styles.clickable,
                ]}
                onPress={() =>
                  link && navigation.navigate(link)
                }
              >
                <ImagePreview value={img} previewSize={140} />
                <Text style={styles.text}>{title}</Text>
              </YStack>
            );
          })}
        </ScrollView>
      </View>
    </YStack>
  );
};

export default CenteredCategoryCarousel;
