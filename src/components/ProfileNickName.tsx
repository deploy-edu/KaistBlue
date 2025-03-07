import styled from "@emotion/native";
import React, { FC } from "react";
import NanumGothicText from "./NanumGothicText";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ProfileIcon = styled.Image`
  width: 21px;
  height: 21px;
  margin-right: 8.56px;
  border-radius: 10.5px;
`;

const NickName = styled(NanumGothicText)`
  color: #000;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.82px;
`;

type Props = {
  onPress?: () => void;
  icon: string;
  nickname: string;
};

const EmptyProfileIcon = require("@/assets/images/empty-profile-icon.png");

const ProfileNickName: FC<Props> = ({ onPress, icon, nickname }) => {
  return (
    <Container onPress={onPress}>
      {icon ? (
        <ProfileIcon source={{ uri: icon }} />
      ) : (
        <ProfileIcon source={EmptyProfileIcon} />
      )}
      <NickName>{nickname}</NickName>
    </Container>
  );
};

export default ProfileNickName;
