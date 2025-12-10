import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScrollView, Image, View } from "react-native";
import { useSelector } from "react-redux";
import { YStack, Text } from "tamagui";
import { ImageSourcePropType } from "react-native";
import AnimatedEntrance from "../components/AnimatedEntrance";

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

const HomeScreen = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    const fetchCategoryAndDetails = async () => {
      setLoading(true);
      try {
        const [categoryRes, detailsRes] = await Promise.all([
          axios.get(PKSOFT_URLS.CUSTOMER.CATEGORY),
          axios.get(PKSOFT_URLS.CUSTOMER.DETAILS),
        ]);

        setCategories(
          Array.isArray(categoryRes.data?.data) ? categoryRes.data.data : []
        );

        setSections(
          Array.isArray(detailsRes.data?.data) ? detailsRes.data.data : []
        );
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

  /* Static category grid data */
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* ✅ Hero Carousel */}
      <View style={styles.sectionTight}>
        <AnimatedEntrance delay={0}>
          <AutoCarousel />
        </AnimatedEntrance>
      </View>

      {/* ✅ Promo Banner */}
      <View style={styles.sectionTight}>
        <Image
          source={Images.promoGif}
          style={styles.promoImage}
          resizeMode="contain"
        />
      </View>

      {/* ✅ Category Icons Carousel */}
      {categories.length > 0 && (
        <View style={styles.sectionTight}>
          <AnimatedEntrance delay={200}>
            <CategoryCarousel
              categories={categories}
              titleKey="name"
              imageKey="image"
              linkKey="pageUrl"
            />
          </AnimatedEntrance>
        </View>
      )}

      {/* ✅ Top Categories Grid */}
      <View style={styles.sectionTight}>
        <CategoryGrid leftItems={leftItems} rightItem={rightItem} />
      </View>

      {/* ✅ Product Sections */}
      <YStack style={styles.sectionNormal}>
        {loading ? (
          <View style={styles.skeletonGrid}>
            {Array.from({ length: 4 }).map((_, i) => (
              <View key={i} style={styles.skeletonItem}>
                <SkeletonProductCard />
              </View>
            ))}
          </View>
        ) : sections.length === 0 ? (
          <Text style={styles.emptyText}>No products available.</Text>
        ) : (
          sections
            .filter(Boolean)
            .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
            .map((section, idx) => (
              <SectionCarousel
                key={idx}
                sectionTag={section?.tag || `Section ${idx + 1}`}
                products={section?.products || []}
              />
            ))
        )}
      </YStack>

      {/* ✅ Static sections */}
      <View style={styles.sectionNormal}>
        <FeaturesSection />
      </View>

      <View style={styles.sectionNormal}>
        <ReviewCarousel />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
