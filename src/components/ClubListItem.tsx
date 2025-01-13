import styled from "@emotion/native";
import { FC } from "react";
import CommonText from "./CommonText";

const ItemContainer = styled.TouchableOpacity`
  border-radius: 20px;
  height: 169px;
  background-color: #000;
  margin-bottom: 29px;
  margin-horizontal: 16px;
  padding-horizontal: 0px;
`;

const ItemBackgroundContainer = styled.ImageBackground`
  flex: 1;
  padding-top: 25px;
  align-items: center;
  border-radius: 20px;
`;

const ItemTitle = styled(CommonText)`
  color: #fff;
  text-align: center;
  font-family: NanumGothic;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  margin-bottom: 12px;
`;

const ItemDesc = styled(CommonText)`
  color: #fff;
  text-align: center;
  font-family: NanumGothic;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18.2px;
`;

type Props = {
  title: string;
  desc: string;
  imageStr?: string;
  onPress: () => void;
};

const ClubListItem: FC<Props> = ({title, desc, imageStr, onPress}) => (
  <ItemContainer onPress={onPress}>
    <ItemBackgroundContainer source={{uri: imageStr}} imageStyle={{borderRadius: 20}}>
      <ItemTitle>{title}</ItemTitle>
      <ItemDesc>{desc}</ItemDesc>
    </ItemBackgroundContainer>
  </ItemContainer>
);

export default ClubListItem;