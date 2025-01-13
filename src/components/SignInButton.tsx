import styled from '@emotion/native';
import React, {FC} from 'react';
import {GestureResponderEvent, ViewStyle} from 'react-native';
import CommonText from './CommonText';

const Container = styled.Pressable`
  border-radius: 37px;
  background: #fff;
  width: 310px;
  height: 56px;
  color: #006996;
  align-items: center;
  justify-content: center;
`;

const ButtonTitle = styled(CommonText)`
  font-size: 13px;
  font-weight: 800;
  color: #006996;
`;

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
};

const SignInButton: FC<Props> = ({style, onPress}) => {
  return (
    <Container onPress={onPress} style={style}>
      <ButtonTitle>Sign-in</ButtonTitle>
    </Container>
  );
};

export default SignInButton;
