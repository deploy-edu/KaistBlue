import styled from '@emotion/native';
import React, {FC} from 'react';
import SubmitButton from './SubmitButton';

type Props = {
  onPress: () => void;
};

const ReStyledSubmitButton = styled(SubmitButton)`
  background-color: #9d9d9d;
`;

const CancelButton: FC<Props> = ({onPress}) => {
  return <ReStyledSubmitButton title="취소" onPress={onPress} />;
};

export default CancelButton;
