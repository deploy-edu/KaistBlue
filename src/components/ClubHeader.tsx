import ProfileImage from "@/components/ProfileImage";
import styled from "@emotion/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { Animated, Image, ImageBackground, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MemberCount from "./MemberCount";
import NanumGothicText from "./NanumGothicText";

type Props = {
  style?: ViewStyle;
  image: string;
  profileImage?: string;
  onBack?: () => void;
  onWrite?: () => void;
  onProfile?: () => void;
  title: string;
  desc: string;
};

const TopContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BottomContainer = styled.View`
  flex-direction: row;
  bottom: 63px;
  justify-content: space-between;
`;

const LinearGraidentContainer = styled(LinearGradient)`
  height: 250px;
  padding-top: 25px;
  algin-items: center;
  padding-horizontal: 25px;
`;

const BackButtonContainer = styled.Pressable``;

const WriteButtonContainer = styled.Pressable`
  width: 85px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(17, 141, 255, 0.8);
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const WriteButtonIcon = styled.Image`
  width: 10.057px;
  height: 10.914px;
  margin-right: 8.94px;
`;

const WriteButtonTitle = styled(NanumGothicText)`
  color: #fff;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 13.68px;
`;

const Title = styled(NanumGothicText)`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  flex: 1;
`;

const Description = styled(NanumGothicText)`
  margin-top: 12px;
  color: #fff;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18.2px;
  flex: 1px;
`;

const ProfileButton = styled.Pressable`
  justify-content: center;
`;

const BackIcon = require("@/assets/images/arrow-left.png");
const WriteIcon = require("@/assets/images/write-icon.png");

const AnimatedContainer = Animated.createAnimatedComponent(ImageBackground);

const ClubHeader: FC<Props> = ({
  onBack,
  onWrite,
  onProfile,
  image,
  profileImage,
  title,
  desc,
  style,
}) => {
  const { top } = useSafeAreaInsets();

  return (
    <AnimatedContainer source={{ uri: image }} style={style}>
      <LinearGraidentContainer
        style={{ paddingTop: top }}
        colors={[
          "rgba(0, 0, 0, 0.70)",
          "rgba(0, 0, 0, 0.64)",
          "rgba(0, 0, 0, 0.00)",
        ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <TopContainer>
          <BackButtonContainer onPress={onBack}>
            <Image source={BackIcon} />
          </BackButtonContainer>
          <Title>{title}</Title>
          <ProfileButton onPress={onProfile}>
            <ProfileImage size={30} uri={profileImage} />
          </ProfileButton>
        </TopContainer>
        <Description>{desc}</Description>
        <BottomContainer>
          <MemberCount count={100} />
          <WriteButtonContainer onPress={onWrite}>
            <WriteButtonIcon source={WriteIcon} />
            <WriteButtonTitle>글쓰기</WriteButtonTitle>
          </WriteButtonContainer>
        </BottomContainer>
      </LinearGraidentContainer>
    </AnimatedContainer>
  );
};

export default ClubHeader;
