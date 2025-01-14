import ArticleListItem from "@/components/ArticleListItem";
import ClubHeader from "@/components/ClubHeader";
import fetchArticles from "@/libs/apis/fetchArticles";
import { RootStackParamList } from "@/navigators/RootStackNavigator";
import { useArticleStore } from "@/stores/useArticleStore";
import { useCommunityStore } from "@/stores/useCommunityStore";
import styled from "@emotion/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

type Props = NativeStackScreenProps<RootStackParamList, "ClubHome">;

const ClubHomeScreen: FC<Props> = ({ navigation, route }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { communityId } = route.params;
  const community = useCommunityStore(
    (state) => state.communitiesById[communityId]
  );

  const articleIds = useArticleStore((state) => state.articleIds);

  const onPress = useCallback(
    (id: number) => () => {
      navigation.navigate("ViewArticle", { communityId, id });
    },
    [communityId, navigation]
  );

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onWrite = useCallback(() => {
    navigation.navigate("AddArticle", { communityId });
  }, [communityId, navigation]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    const articles = await fetchArticles({
      id: communityId.toString(),
    });
    useArticleStore.getState().setArticles(articles.data);
    setIsRefreshing(false);
  }, [communityId]);

  useEffect(() => {
    async function init() {
      const articles = await fetchArticles({
        id: communityId.toString(),
      });
      useArticleStore.getState().setArticles(articles.data);
    }
    init();
  }, []);

  return (
    <Container>
      <FlatList
        data={articleIds}
        ListHeaderComponent={
          <ClubHeader
            image={`${community.type}${community.image}`}
            title="창작과 문예"
            desc={`상상이 현실이 되는 그 순간\n창작과 문예의 세계에 빠져보세요.`}
            onBack={onBack}
            onWrite={onWrite}
          />
        }
        renderItem={({ item }) => (
          <ArticleListItem id={item} onPress={onPress(item)} />
        )}
        keyExtractor={(item) => item.toString()}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </Container>
  );
};

export default ClubHomeScreen;
