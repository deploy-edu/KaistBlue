import styled from '@emotion/native';
import React, {FC} from 'react';
import CommonText from './CommonText';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ProfileIcon = styled.Image`
  width: 21px;
  height: 21px;
  margin-right: 8.56px;
`;

const NickName = styled(CommonText)`
  color: #000;
  font-family: NanumGothic;
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

const EmptyProfileIcon = require('@/assets/images/empty-profile-icon.png');

const ProfileNickName: FC<Props> = ({onPress, icon, nickname}) => {
  return (
    <Container onPress={onPress}>
      {icon ? (
        <ProfileIcon source={{uri: icon}} />
      ) : (
        <ProfileIcon source={EmptyProfileIcon} />
      )}
      <NickName>{nickname}</NickName>
    </Container>
  );
};

export default ProfileNickName;
