import ArticleListItem from "@/components/ArticleListItem";
import ClubHeader from "@/components/ClubHeader";
import fetchArticles from "@/libs/apis/fetchArticles";
import { RootStackParamList } from "@/navigators/RootStackNavigator";
import { useArticleStore } from "@/stores/useArticleStore";
import { useCommunityStore } from "@/stores/useCommunityStore";
import styled from "@emotion/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const HeaderContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 250px;
  overflow: hidden;
`;

const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: #000;
  margin-top: 20px;
`;

type Props = NativeStackScreenProps<RootStackParamList, "ClubHome">;

const ClubHomeScreen: FC<Props> = ({ navigation, route }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { communityId } = route.params;
  const community = useCommunityStore(
    (state) => state.communitiesById[communityId]
  );

  const articleIds = useArticleStore((state) => state.articleIds);

  // 프로필 이미지 조합
  const profileImageUri = useMemo(() => {
    if (!community?.profileImage) {
      return undefined;
    }

    // 이미 data URI 형태인 경우
    if (community.profileImage.startsWith("data:")) {
      return community.profileImage;
    }

    // profileImageType과 profileImage를 조합
    if (community.profileImageType) {
      return `${community.profileImageType}${community.profileImage}`;
    }

    // type이 없으면 기본값으로 image/png 사용
    return `data:image/png;base64,${community.profileImage}`;
  }, [community?.profileImage, community?.profileImageType]);

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

  const onProfile = useCallback(() => {
    navigation.navigate("AddProfile", { communityId, id: community.userId });
  }, [communityId, community.userId, navigation]);

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
      <HeaderContainer>
        <ClubHeader
          image={`${community.type}${community.image}`}
          profileImage={profileImageUri}
          title={community?.title || ""}
          desc={community?.summary || ""}
          onBack={onBack}
          onWrite={onWrite}
          onProfile={onProfile}
          memberCount={community.memberCount || 0}
          scrollY={scrollY}
        />
      </HeaderContainer>
      <Animated.FlatList
        data={articleIds}
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingTop: 250,
          paddingBottom: 17,
        }}
        ListEmptyComponent={
          <EmptyContainer>
            <EmptyText>게시글이 없습니다.</EmptyText>
          </EmptyContainer>
        }
        renderItem={({ item }) => (
          <ArticleListItem id={item} onPress={onPress(item)} />
        )}
        keyExtractor={(item) => item.toString()}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </Container>
  );
};

export default ClubHomeScreen;
