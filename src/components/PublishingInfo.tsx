import {RootStackParamList} from '@/navigators/RootStackNavigator';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useCallback} from 'react';
import CommonText from './CommonText';
import ProfileNickName from './ProfileNickName';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 19px;
`;

const PublishingDate = styled(CommonText)`
  color: #6c6c6c;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 12.54px;
`;

type Props = {
  id: string;
  nickname: string;
  iconUrl: string;
  publishedAt: string;
};

const PublishingInfo: FC<Props> = ({id, nickname, iconUrl, publishedAt}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const onPress = useCallback(() => {
    navigation.navigate('ProfileAdd', {id});
  }, [navigation, id]);

  return (
    <Container>
      <ProfileNickName nickname={nickname} icon={iconUrl} onPress={onPress} />
      <PublishingDate>{publishedAt}</PublishingDate>
    </Container>
  );
};

export default PublishingInfo;
