import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Text, YStack } from "tamagui";
import { useNavigation } from "@react-navigation/native";

import { resolveImageUrl } from "../utilits/Common";
import { styles } from "../custonCSS/components/CategoryGrid.styles";

/* =======================
   Types
   ======================= */

interface CategoryItem {
  title: string;
  image: string | { uri: string } | number | null | undefined;
  route: string;
}

interface CategoryGridProps {
  leftItems: CategoryItem[];
  rightItem: CategoryItem;
  smallCardHeight?: number;
  largeCardHeight?: number;
}

/* =======================
   Component
   ======================= */

const CategoryGrid = ({
  leftItems,
  rightItem,
  smallCardHeight = 260,
  largeCardHeight = 540,
}: CategoryGridProps) => {
  const navigation = useNavigation<any>();

  /* ✅ SAFE IMAGE RESOLVER (RN compliant) */
  const renderImage = (src: CategoryItem["image"]) => {
    // local image (require)
    if (typeof src === "number") {
      return src;
    }

    // already in { uri } form
    if (typeof src === "object" && src?.uri) {
      return src;
    }

    // string path / url
    if (typeof src === "string") {
      if (src.startsWith("/")) {
        return { uri: resolveImageUrl(src) };
      }
      return { uri: src };
    }

    // fallback (prevents crash)
    return undefined;
  };

  return (
    <YStack style={styles.wrapper}>
      <Text style={styles.title}>Top Categories</Text>

      <View style={styles.row}>
        {/* LEFT GRID */}
        <View style={styles.leftGrid}>
          {leftItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.85}
              onPress={() => navigation.navigate(item.route)}
              style={[
                styles.card,
                {
                  flex: 1,
                  height: smallCardHeight,
                },
              ]}
            >
              <View style={styles.imageWrapper}>
                <Image
                  source={renderImage(item.image)}
                  resizeMode="cover"
                  style={styles.image}
                />

                <View style={styles.overlay}>
                  <Text style={styles.overlayTitle}>{item.title}</Text>
                  <View style={styles.shopBtn}>
                    <Text style={styles.shopText}>SHOP NOW</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* RIGHT LARGE CARD */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate(rightItem.route)}
          style={[
            styles.card,
            {
              flex: 1,
              height: largeCardHeight,
            },
          ]}
        >
          <View style={styles.imageWrapper}>
            <Image
              source={renderImage(rightItem.image)}
              resizeMode="cover"
              style={styles.image}
            />

            <View style={styles.overlay}>
              <Text style={styles.overlayTitle}>{rightItem.title}</Text>
              <View style={styles.shopBtn}>
                <Text style={styles.shopText}>SHOP NOW</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </YStack>
  );
};

export default CategoryGrid;
