import React from "react";
import { YStack, XStack, Text, View, Anchor } from "tamagui";
import { 
  Truck, RotateCcw, Award, Tags, 
  Facebook, Twitter, Instagram, Youtube 
} from "lucide-react-native";

import { footerData } from "../data/footerData";

interface SocialIconProps {
  icon: React.ReactNode;
  url: string;
}


const Footer = () => {
  return (
    <YStack bg="$color1" py="$6" px="$4">
      {/* ---------- Main Sections ---------- */}
      <XStack flexWrap="wrap" justifyContent="space-between" mb="$6">
        {footerData.sections.map((section, idx) => (
          <YStack key={idx} width="48%" mb="$4">
            <Text fontWeight="700" textTransform="uppercase" mb="$2">
              {section.title}
            </Text>

            {section.links.map((link, i) => (
              <Anchor 
                key={i} 
                href={link.url}
                color="$color12"
                textDecorationLine="none"
                mb="$1"
              >
                {link.label}
              </Anchor>
            ))}
          </YStack>
        ))}
      </XStack>

      {/* ---------- Highlights Row ---------- */}
      <XStack 
        borderTopWidth={1} 
        borderColor="$borderColor" 
        pt="$4"
        flexWrap="wrap"
        justifyContent="space-between"
        mb="$6"
      >
        {/* <Highlight icon={<Truck size={28} color="pink" />} title="FREE SHIPPING" text="On Orders Above ₹299" />
        <Highlight icon={<RotateCcw size={28} color="pink" />} title="EASY RETURNS" text="15-Day Return Policy" />
        <Highlight icon={<Award size={28} color="pink" />} title="100% AUTHENTIC" text="Products Sourced Directly" />
        <Highlight icon={<Tags size={28} color="pink" />} title="1900+ BRANDS" text="1.2 Lakh+ Products" /> */}
      </XStack>

      {/* ---------- Social Media ---------- */}
      <YStack 
        borderTopWidth={1} 
        borderColor="$borderColor" 
        pt="$4"
        alignItems="center"
        mb="$4"
      >
        <Text mb="$2">Show us some love on social media ❤️</Text>

        <XStack space="$4">
          <SocialIcon icon={<Facebook size={22} />} url="" />
          <SocialIcon icon={<Twitter size={22} />} url="" />
          <SocialIcon icon={<Instagram size={22} />} url="" />
          <SocialIcon icon={<Youtube size={22} />} url="" />
        </XStack>
      </YStack>

      {/* ---------- Legal Links ---------- */}
      <XStack justifyContent="center" flexWrap="wrap" mb="$2">
        {footerData.legal.map((item, i) => (
          <Anchor 
            key={i}
            href={item.url}
            color="$color12"
            textDecorationLine="none"
            mx="$2"
          >
            {item.label}
          </Anchor>
        ))}
      </XStack>

      {/* ---------- Copyright ---------- */}
      <Text textAlign="center" fontSize="$2" color="$color11">
        {footerData.copyright}
      </Text>
    </YStack>
  );
};

// ----------------------------------
// Reusable Components
// ----------------------------------

// const Highlight = ({ icon:any, title, text }) => (
//   <YStack width="48%" mb="$4" alignItems="center">
//     <View mb="$2">{icon}</View>
//     <Text fontWeight="700">{title}</Text>
//     <Text fontSize="$2">{text}</Text>
//   </YStack>
// );

const SocialIcon: React.FC<SocialIconProps> = ({ icon, url }) => (
  <Anchor href={url} target="_blank">
    {icon}
  </Anchor>
);

export default Footer;
