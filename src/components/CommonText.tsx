import React, { FC, useMemo } from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

type Props = TextProps;

const CommonText: FC<Props> = ({ style, children, ...props }) => {
  const flattenStyle = StyleSheet.flatten([styles.text, style]) as TextStyle;
  const { fontWeight, ...restStyle } = flattenStyle;
  const fontFamily = useMemo(() => {
    switch (fontWeight) {
      case "100": // Thin or Light (not explicitly mapped, default to Light)
      case "200":
      case "300":
        return "NanumSquareNeo-Lt"; // Light
      case "400": // Regular
        return "NanumSquareNeo-Rg"; // Regular
      case "500": // Medium (closest fallback)
      case "600":
        return "NanumSquareNeo-Hv"; // Heavy
      case "700": // Bold
        return "NanumSquareNeo-Bd"; // Bold
      case "800": // Extra Bold
      case "900": // Black (if needed, Extra Bold can handle this)
        return "NanumSquareNeo-Eb"; // Extra Bold
      default: // Default case
        return "NanumSquareNeo-Rg"; // Regular as fallback
    }
  }, [fontWeight]);

  return (
    <Text
      style={[
        restStyle,
        {
          fontFamily,
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

export default CommonText;
