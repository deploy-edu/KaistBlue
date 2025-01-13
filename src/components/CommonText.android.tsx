import React, {FC} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

type Props = TextProps;

const CommonText: FC<Props> = ({style, children, ...props}) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NanumSquareNeo',
    fontSize: 12,
    color: '#000000',
  },
});

export default CommonText;
