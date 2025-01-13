import styled from '@emotion/native';
import React, {FC} from 'react';
import CommonText from './CommonText';
import PublishingInfo from './PublishingInfo';

const Container = styled.View`
  padding-vertical: 26px;
  border-bottom-width: 1px;
  border-bottom-color: #e9e9e9;
`;

const Title = styled(CommonText)`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 18.24px;
  margin-bottom: 20px;
`;

const Contents = styled(CommonText)`
  color: #000;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.82px;
`;

type Props = {
  title: string;
  contents: string;
  nickname: string;
  publishedAt: string;
  iconUrl: string;
};

const ArticleContent: FC<Props> = ({
  title,
  contents,
  nickname,
  iconUrl,
  publishedAt,
}) => {
  return (
    <Container>
      <PublishingInfo
        iconUrl={iconUrl}
        nickname={nickname}
        publishedAt={publishedAt}
        id=""
      />
      <Title>{title}</Title>
      <Contents>{contents.trim()}</Contents>
    </Container>
  );
};

export default ArticleContent;
