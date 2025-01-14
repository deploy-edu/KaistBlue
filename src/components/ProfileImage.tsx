import styled from "@emotion/native";
import React, { useMemo } from "react";
import { Image, ImageStyle } from "react-native";

const DEFAULT_PROFILE_IMAGE = require("../assets/images/empty-profile-icon.png");

type Props = {
  size?: number;
  uri?: string;
  style?: ImageStyle;
};

const StyledImage = styled.Image`
  border-color: #ccc;
  border-width: 1px;
`;

const ProfileImage: React.FC<Props> = ({ size = 60, uri, style }) => {
  const source = useMemo(() => {
    console.log("typeof uri", typeof uri);

    if (uri) {
      if (typeof uri === "number") {
        return { uri: Image.resolveAssetSource(uri).uri };
      } else {
        return { uri };
      }
    }

    return DEFAULT_PROFILE_IMAGE;
  }, [uri]);

  return (
    <StyledImage
      source={source}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    />
  );
};

export default ProfileImage;
