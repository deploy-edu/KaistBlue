import { useArticleStore } from "@/stores/useArticleStore";
import styled from "@emotion/native";
import dayjs from "dayjs";
import { FC } from "react";
import CommonText from "./CommonText";
import PublishingInfo from "./PublishingInfo";

const Container = styled.Pressable`
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e9e9e9;
  margin-bottom: 15px;
  margin-horizontal: 16px;
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
        nickname={"글쓴이"}
        publishedAt={dayjs(article.createdAt).fromNow()}
        iconUrl=""
        id=""
      />
      <ItemTitle>{article.title}</ItemTitle>
      <ItemContent>{article.content}</ItemContent>
    </Container>
  );
};

export default ArticleListItem;
