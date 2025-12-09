import React, { useState } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { Text } from "tamagui";

import { resolveImageUrl } from "../utilits/Common";
import { Images } from "../assets/images";
import { ImageSourcePropType } from "react-native";
import { styles } from "../custonCSS/components/ImagePreview.styles";

/* =======================
   Types
   ======================= */

interface ImagePreviewProps {
  value?: string;
  onChange?: (file: any | null) => void; // handled externally in RN
  onDelete?: () => void;
  disabled?: boolean;
  previewSize?: number;
  previewOnly?: boolean;
}
const DEFAULT_IMAGE: ImageSourcePropType[] = [
    Images.dummyIMG,
]
/* =======================
   Component
   ======================= */

const ImagePreview = ({
  value,
  onDelete,
  disabled = false,
  previewSize = 180,
  previewOnly = false,
}: ImagePreviewProps) => {
  const [loading, setLoading] = useState(true);

  const imageSrc = value
    ? value.startsWith("data:")
      ? { uri: value }
      : { uri: resolveImageUrl(value) }
    : DEFAULT_IMAGE[0];

  return (
    <View style={{ width: previewSize }}>
      <View
        style={[
          styles.wrapper,
          { width: previewSize, height: previewSize },
        ]}
      >
        {/* Dummy placeholder (always visible) */}
        <Image
          source={DEFAULT_IMAGE[0]}
          style={[
            styles.placeholder,
            { width: previewSize, height: previewSize },
          ]}
          resizeMode="cover"
        />

        {/* Actual image */}
        <Image
          source={imageSrc}
          resizeMode="cover"
          style={[
            styles.image,
            { width: previewSize, height: previewSize },
            loading ? styles.loading : styles.loaded,
          ]}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />

        {/* Delete button */}
        {!previewOnly && value && onDelete && (
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={onDelete}
            disabled={disabled}
          >
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ImagePreview;
