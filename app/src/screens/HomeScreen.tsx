import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScrollView, Image, View } from "react-native";
import { useSelector } from "react-redux";
import { YStack, Text } from "tamagui";

import { ImageSourcePropType } from "react-native";
import { Images } from "../assets/images";

import AutoCarousel from "../components/AutoCarousel";
import CategoryCarousel from "../components/CenteredCategoryCarousel";
import CategoryGrid from "../components/CategoryGrid";
import FeaturesSection from "../components/FeaturesSection";
import ReviewCarousel from "../components/ReviewCarousel";
import SectionCarousel from "../components/SectionCarousel";
import SkeletonProductCard from "../skeletonLoading/SkeletonProductCard";

import PKSOFT_URLS from "../utilits/Pk_api_Urls";
import { styles } from "../custonCSS/screens/HomeScreen.styles";

interface CategoryImageItem {
  image: ImageSourcePropType;
}
/* =======================
   Component
   ======================= */

const HomeScreen = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    const fetchCategoryAndDetails = async () => {
      setLoading(true);
      try {
        /* ✅ Parallel API calls */
        const [categoryRes, detailsRes] = await Promise.all([
          axios.get(PKSOFT_URLS.CUSTOMER.CATEGORY),
          axios.get(PKSOFT_URLS.CUSTOMER.DETAILS),
        ]);

        const categoryData = Array.isArray(categoryRes.data?.data)
          ? categoryRes.data.data
          : [];

        const detailsData = Array.isArray(detailsRes.data?.data)
          ? detailsRes.data.data
          : [];

        setCategories(categoryData);
        setSections(detailsData);
      } catch (error) {
        console.error("Error fetching home screen data:", error);
        setCategories([]);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndDetails();
  }, []);

 const DEFAULT_IMAGES: CategoryImageItem[] = [
  { image: Images.category_clothing },
  { image: Images.category_home_appliances },
  { image: Images.category_perfume },
  { image: Images.category_shoes },
];
  /* Static category grid (RN props renamed) */
  const leftItems = [
    {
      title: "Mobile Accessories",
      image: Images.category_Mobile_Accessories,
      route: "MobileAccessories",
    },
    {
      title: "Shoes Category",
      image: Images.category_shoes,
      route: "Shoes",
    },
    {
      title: "Clothing Category",
      image: Images.category_clothing,
      route: "Clothing",
    },
    {
      title: "Perfume Category",
      image: Images.category_perfume,
      route: "Perfume",
    },
  ];

  const rightItem = {
    title: "Home Appliances",
    image: Images.category_home_appliances,
    route: "HomeAppliances",
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero AutoCarousel */}
      <AutoCarousel />

      {/* Promo GIF */}
      <View style={styles.promoWrapper}>
        <Image
          source={Images.promoGif}
          style={styles.promoImage}
          resizeMode="contain"
        />
      </View>

      {/* ✅ Category AutoCarousel using already-fetched data */}
      {categories.length > 0 && (
        <CategoryCarousel
          categories={categories}
          titleKey="name"
          imageKey="image"
          linkKey="pageUrl"
        />
      )}

      {/* Category grid */}
      <CategoryGrid
      leftItems={leftItems}
      rightItem={rightItem}
      smallCardHeight={320}
      largeCardHeight={600}
    />

      {/* Product Sections */}
      <YStack style={styles.sectionWrapper}>
        {loading ? (
          <View style={styles.skeletonGrid}>
            {Array.from({ length: 4 }).map((_, i) => (
              <View key={i} style={styles.skeletonItem}>
                <SkeletonProductCard />
              </View>
            ))}
          </View>
        ) : sections.length === 0 ? (
          <Text style={styles.emptyText}>
            No products available.
          </Text>
        ) : (
          sections
            .filter(Boolean)
            .sort(
              (a, b) => (a?.order ?? 0) - (b?.order ?? 0)
            )
            .map((section, idx) => (
              <SectionCarousel
                key={idx}
                sectionTag={section?.tag || `Section ${idx + 1}`}
                products={section?.products || []}
              />
            ))
        )}
      </YStack>

      {/* Static sections */}
      <FeaturesSection />
      <ReviewCarousel />
    </ScrollView>
  );
};

export default HomeScreen;
