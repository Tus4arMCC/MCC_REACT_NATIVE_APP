import React, { useEffect, useState } from "react";
import { Image, View, Pressable } from "react-native";
import { Text, YStack } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useWishlist } from "../hooks/useWishlist";
import CartButton from "../components/AnimatedCartButton";
import UltraFancyLikeButton from "../components/UltraFancyLikeButton";
import { ImageSourcePropType } from "react-native";
import { Images } from "../assets/images";
import { styles } from "../custonCSS/components/ProductCard.styles";

/* =======================
   Types
   ======================= */

interface ProductCardProps {
  tag?: string;
  productId: string;
  image: string;
  title: string;
  price: number;
  mrp: number;
  discount?: number;
  rating?: number;
  reviews?: number;
  route?: string;
  isFavourite?: boolean;
  isInCart?: boolean;
}

/* =======================
   Component
   ======================= */

const ProductCard = ({
  tag,
  productId,
  image,
  title,
  price,
  mrp,
  rating,
  route,
  isFavourite,
  isInCart,
}: ProductCardProps) => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);

  /* Wishlist logic (UNCHANGED) */
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const id = String(productId);
  const storeWishlisted = isWishlisted(id);

  const [localLiked, setLocalLiked] = useState<boolean>(
    typeof isFavourite === "boolean" ? isFavourite : storeWishlisted
  );

  useEffect(() => {
    if (storeWishlisted !== localLiked) {
      setLocalLiked(storeWishlisted);
    }
  }, [storeWishlisted]);

  const handleNavigate = () => {
    if (route) navigation.navigate(route);
  };

  return (
    <YStack style={styles.card}>
      {/* Ribbon */}
      {tag && (
        <View style={styles.ribbon}>
          <Text style={styles.ribbonText}>{tag}</Text>
        </View>
      )}

      {/* Wishlist */}
      <View style={styles.wishlistIcon}>
        <UltraFancyLikeButton
          liked={localLiked}
          onPress={async () => {
            const prev = localLiked;
            if (prev) {
              const res = await removeFromWishlist(id);
              if (res?.success) setLocalLiked(false);
            } else {
              const res = await addToWishlist(id);
              if (res?.success) setLocalLiked(true);
            }
          }}
          size={44}
          sparkleCount={12}
        />
      </View>

      {/* Image */}
      <Pressable onPress={handleNavigate}>
        <View style={styles.imageContainer}>
          {loading && (
            <Image
              source={Images.dummyIMG}
              style={[styles.image, styles.placeholder]}
            />
          )}

          <Image
            source={{ uri: image }}
            resizeMode="contain"
            style={styles.image}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </View>
      </Pressable>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1} onPress={handleNavigate}>
          {title}
        </Text>

        <Text style={styles.price}>₹{price.toLocaleString("en-IN")}</Text>
        <Text style={styles.mrp}>₹{mrp.toLocaleString("en-IN")}</Text>

        {/* Rating */}
        {rating && (
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Ionicons
                key={s}
                name={s <= rating ? "star" : "star-outline"}
                size={14}
                color="#ffc107"
              />
            ))}
            <Text fontSize={12}> {rating.toFixed(1)}</Text>
          </View>
        )}

        {/* Cart */}
        <View style={styles.cartWrapper}>
          <CartButton
            productId={id}
            initialInCart={
              typeof isInCart === "boolean" ? isInCart : undefined
            }
          />
        </View>
      </View>
    </YStack>
  );
};

export default ProductCard;
