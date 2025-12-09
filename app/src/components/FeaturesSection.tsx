import React from "react";
import { View } from "react-native";
import { Text, YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../custonCSS/components/FeaturesSection.styles";

/*
  FeaturesSection
  ----------------
  ✅ Static feature highlights
  ✅ Mobile-friendly layout
*/

const FeaturesSection = () => {
  return (
    <YStack style={styles.section}>
      <View style={styles.row}>
        {/* Free Shipping */}
        <View style={styles.item}>
          <Ionicons name="car-outline" size={28} color="#fff" />
          <Text style={styles.title}>Free Shipping</Text>
          <Text style={styles.desc}>
            For orders above Rs 500* (TnC Apply)
          </Text>
        </View>

        {/* Safety */}
        <View style={styles.item}>
          <Ionicons name="shield-checkmark-outline" size={28} color="#fff" />
          <Text style={styles.title}>Highest Safety Standards</Text>
          <Text style={styles.desc}>
            Enjoy worry-free cooking
          </Text>
        </View>

        {/* Secure Payment */}
        <View style={styles.item}>
          <Ionicons name="lock-closed-outline" size={28} color="#fff" />
          <Text style={styles.title}>Secured Payments</Text>
          <Text style={styles.desc}>
            Fast and Secure Checkout
          </Text>
        </View>
      </View>
    </YStack>
  );
};

export default FeaturesSection;
