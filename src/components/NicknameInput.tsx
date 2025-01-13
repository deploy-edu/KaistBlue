import styled from '@emotion/native';
import React, {FC} from 'react';
import {Platform, ViewStyle} from 'react-native';

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  secureTextEntry?: boolean;
};

const CustomTextInput = styled.TextInput`
  border-radius: 37px;
  background: rgba(118, 158, 188, 0.3);
  height: 56px;
  width: 310px;
  text-align: center;
  color: #212121;
  font-family: NanumSquareNeo
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
`;

const NicknameInput: FC<Props> = ({
  value,
  placeholder,
  secureTextEntry,
  style,
  onChangeText,
}) => {
  return (
    <CustomTextInput
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={style}
      placeholderTextColor={'#fff'}
    />
  );
};

export default NicknameInput;
