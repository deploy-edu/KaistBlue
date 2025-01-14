import { useCommunityStore } from "@/stores/useCommunityStore";
import styled from "@emotion/native";
import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import CommonText from "./CommonText";

const ItemContainer = styled.TouchableOpacity`
  height: 169px;
  background-color: #000;
  margin-bottom: 29px;
  margin-horizontal: 16px;
  padding-horizontal: 0px;
  border-radius: 20px;
`;

const ItemBackgroundContainer = styled.ImageBackground`
  flex: 1;
  border-radius: 20px;
`;

const ItemTitle = styled(CommonText)`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  margin-bottom: 12px;
`;

const ItemDesc = styled(CommonText)`
  color: #fff;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18.2px;
`;

const LinearGraidentContainer = styled(LinearGradient)`
  flex: 1;
  padding-top: 25px;
  align-items: center;
  border-radius: 20px;
`;

type Props = {
  id: number;
  onPress: () => void;
};

const ClubListItem: FC<Props> = ({ id, onPress }) => {
  const community = useCommunityStore((state) => state.communitiesById[id]);

  if (!community) return null;

  return (
    <ItemContainer onPress={onPress}>
      <ItemBackgroundContainer
        source={{ uri: `${community.type}${community.image}` }}
        imageStyle={{ borderRadius: 20 }}
      >
        <LinearGraidentContainer
          colors={[
            "rgba(0, 0, 0, 0.70)",
            "rgba(0, 0, 0, 0.64)",
            "rgba(0, 0, 0, 0.00)",
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <ItemTitle>{community.title}</ItemTitle>
          <ItemDesc>{community.summary}</ItemDesc>
        </LinearGraidentContainer>
      </ItemBackgroundContainer>
    </ItemContainer>
  );
};
export default ClubListItem;
