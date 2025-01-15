import { useArticleStore } from "@/stores/useArticleStore";
import styled from "@emotion/native";
import dayjs from "dayjs";
import { FC } from "react";
import CommonText from "./CommonText";
import PublishingInfo from "./PublishingInfo";

const Container = styled.Pressable`
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #e9e9e9;
  padding-bottom: 20px;
  padding-top: 11px;
  padding-horizontal: 16px;
`;

const ItemTitle = styled(CommonText)`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 18.24px;
  margin-bottom: 9px;
`;

const ItemContent = styled(CommonText)`
  color: #000
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.82px;
`;

type Props = {
  id: number;
  onPress: () => void;
};

const ArticleListItem: FC<Props> = ({ id, onPress }) => {
  const article = useArticleStore((state) => state.articlesById[id]);
  return (
    <Container onPress={onPress}>
      <PublishingInfo
        nickname={article.nickName || "닉네임"}
        publishedAt={dayjs(article.createdAt).fromNow()}
        iconUrl={
          article.profileType &&
          article.profileImage &&
          `${article.profileType}${article.profileImage}`
        }
        id={article.userId}
      />
      <ItemTitle>{article.title}</ItemTitle>
      <ItemContent>{article.content}</ItemContent>
    </Container>
  );
};

export default ArticleListItem;
