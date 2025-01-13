import styled from '@emotion/native';
import React, {FC} from 'react';
import {ViewStyle} from 'react-native';
import CommonText from './CommonText';

const Button = styled.TouchableOpacity`
flex: 1;
  height: 44px;
  background-color: rgba(17, 141, 255, 0.8);
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const ButtonTitle = styled(CommonText)`
  color: #fff;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 13.68px;
`;

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
};

const SubmitButton: FC<Props> = ({title, onPress, style}) => {
  return (
    <Button onPress={onPress} style={style}>
      <ButtonTitle>{title}</ButtonTitle>
    </Button>
  );
};

export default SubmitButton;
