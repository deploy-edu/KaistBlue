import UserIcon from "@/assets/svgs/user-icon.svg";
import styled from "@emotion/native";
import React, { FC } from "react";
import { ViewStyle } from "react-native";
import NanumGothicText from "./NanumGothicText";

type Props = {
  style?: ViewStyle;
  count: number;
};

const Container = styled.View`
  flex-direction: row;
  border-radius: 15.5px;
  background: rgba(28, 53, 91, 0.8);
  align-items: center;
  justify-content: center;
  gap: 4.32px;
  padding-horizontal: 10.06px;
  padding-vertical: 7px;
`;

const Value = styled(NanumGothicText)`
  color: #fff;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
`;

const MemberCount: FC<Props> = ({ style, count }) => {
  return (
    <Container style={style}>
      <UserIcon />
      <Value>{count}</Value>
    </Container>
  );
};

export default MemberCount;
