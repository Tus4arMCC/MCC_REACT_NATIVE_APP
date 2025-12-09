import React from "react";
import { View, Text,Image, StyleSheet } from "react-native";
import AutoCarousel from "../components/AutoCarousel";
import { Images } from "../assets/images";

export default function HomeScreen() {
  return (
    <View>
      <AutoCarousel />
      <View style={styles.container}>
      <Image
        source={Images.promoGif}
        style={styles.image}
        resizeMode="contain"
      />
      <Text>Home Screen</Text>
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
  /* Equivalent of <div className="my-4"> */
  container: {
    marginTop: 4,
    width: "100%",
  },

  /* Equivalent of <img style={{ width: "100%", height: "auto" }} /> */
  image: {
    width: "100%",
    height: 200, // required in RN, no auto-height
  },
});
