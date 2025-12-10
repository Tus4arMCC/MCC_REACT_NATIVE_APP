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
  leftItems: CategoryItem[]; // expect 4 items
  rightItem: CategoryItem;
}

/* =======================
   Component
======================= */

const CategoryGrid = ({ leftItems, rightItem }: CategoryGridProps) => {
  const navigation = useNavigation<any>();

  const renderImage = (src: CategoryItem["image"]) => {
    if (typeof src === "number") return src;
    if (typeof src === "object" && src?.uri) return src;
    if (typeof src === "string") {
      if (src.startsWith("/")) return { uri: resolveImageUrl(src) };
      return { uri: src };
    }
    return undefined;
  };

  // just to be safe if less than 4 items
  const topRow = leftItems.slice(0, 2);
  const bottomRow = leftItems.slice(2, 4);

  return (
    <YStack style={styles.wrapper}>
      <Text style={styles.title}>Top Categories</Text>

      <View style={styles.row}>
        {/* LEFT 2x2 GRID */}
        <View style={styles.leftColumn}>
          {/* Top row: items 0 & 1 */}
          <View style={styles.leftRow}>
            {topRow.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.smallCard, index === 0 && styles.smallRightGap]}
                onPress={() => navigation.navigate(item.route)}
              >
                <Image
                  source={renderImage(item.image)}
                  style={styles.image}
                  resizeMode="cover"
                />

                <View style={styles.overlay}>
                  <Text style={styles.overlayTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom row: items 2 & 3 */}
          <View style={styles.leftRow}>
            {bottomRow.map((item, index) => (
              <TouchableOpacity
                key={index + 2}
                style={[styles.smallCard, index === 0 && styles.smallRightGap]}
                activeOpacity={0.85}
                onPress={() => navigation.navigate(item.route)}
              >
                <Image
                  source={renderImage(item.image)}
                  style={styles.image}
                  resizeMode="cover"
                />

                <View style={styles.overlay}>
                  <Text style={styles.overlayTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* RIGHT BIG CARD */}
        <TouchableOpacity
          style={styles.bigCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate(rightItem.route)}
        >
          <Image
            source={renderImage(rightItem.image)}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>{rightItem.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </YStack>
  );
};

export default CategoryGrid;
