import ClubArrowRightIcon from "@/assets/svgs/club-arrow-right-icon.svg";
import { useCommunityStore } from "@/stores/useCommunityStore";
import styled from "@emotion/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { ViewStyle } from "react-native";
import MemberCount from "./MemberCount";
import NanumGothicText from "./NanumGothicText";

type Props = {
  style?: ViewStyle;
  id: number;
  onPress?: () => void;
};

const Container = styled.Pressable`
  height: 169px;
  border-radius: 15.5px;
  /* iOS Shadow */
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  /* Android Shadow */
  elevation: 5;
`;

const BackgroundContainer = styled.ImageBackground`
  flex: 1;
  border-radius: 15.5px;
`;

const Title = styled(NanumGothicText)`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
`;

const Desc = styled(NanumGothicText)`
  color: #fff;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;

const TopContainer = styled.View`
  flex: 1;
  gap: 12px;
`;

const BottomContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LinearGradientContainer = styled(LinearGradient)`
  flex: 1;
  border-radius: 15.5px;
  padding-top: 25px;
  padding-horizontal: 20px;
  padding-bottom: 15px;
`;

const ClubListItem: FC<Props> = ({ style, id, onPress }) => {
  const community = useCommunityStore((state) => state.communitiesById[id]);

  if (!community) {
    return null;
  }

  return (
    <Container style={style} onPress={onPress}>
      <BackgroundContainer
        source={{
          uri:
            community.type &&
            community.image &&
            `${community.type}${community.image}`,
        }}
        imageStyle={{
          borderRadius: 15.5,
        }}
      >
        <LinearGradientContainer
          colors={[
            "rgba(0, 0, 0, 0.70)",
            "rgba(0, 0, 0, 0.64)",
            "rgba(0, 0, 0, 0.00)",
          ]}
          start={{ x: 0.5, y: 0 }} // 180deg의 방향 설정
          end={{ x: 0.5, y: 1 }}
        >
          <TopContainer>
            <Title>{community.title}</Title>
            <Desc>{community.summary}</Desc>
          </TopContainer>
          <BottomContainer>
            <MemberCount count={100} />
            <ClubArrowRightIcon />
          </BottomContainer>
        </LinearGradientContainer>
      </BackgroundContainer>
    </Container>
  );
};

export default ClubListItem;
