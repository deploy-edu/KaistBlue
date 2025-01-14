import React, { FC, useMemo } from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

type Props = TextProps;

const NanumGothicText: FC<Props> = ({ style, children, ...props }) => {
  const flattenStyle = StyleSheet.flatten([styles.text, style]) as TextStyle;
  const { fontWeight, ...restStyle } = flattenStyle;

  const fontFamily = useMemo(() => {
    switch (fontWeight) {
      case "100": // Light
      case "200":
      case "300":
        return "NanumGothicLight";
      case "400": // Regular
        return "NanumGothic";
      case "500": // Medium (fallback to Regular if not available)
        return "NanumGothic";
      case "600": // Semi-Bold (fallback to Bold if not available)
      case "700": // Bold
        return "NanumGothicBold";
      case "800": // Extra Bold
      case "900": // Black (use Extra Bold as closest match)
        return "NanumGothicExtraBold";
      default: // Default case
        return "NanumGothic";
    }
  }, [fontWeight]);

  return (
    <Text
      style={[
        restStyle,
        {
          fontFamily,
          fontWeight: undefined, // Avoid conflicts with explicit font styles
        },
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: "#000000",
  },
});

export default NanumGothicText;
