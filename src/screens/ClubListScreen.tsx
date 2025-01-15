import ClubListItem from "@/components/ClubListItem";
import fetchUserCommunities from "@/libs/apis/fetchUserCommunities";
import { RootStackParamList } from "@/navigators/RootStackNavigator";
import { useCommunityStore } from "@/stores/useCommunityStore";
import styled from "@emotion/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useCallback, useEffect } from "react";
import { FlatList } from "react-native";

const Container = styled.SafeAreaView`
  border-width: 1px;
  flex: 1;
`;

type Props = NativeStackScreenProps<RootStackParamList, "ClubList">;

const ClubListScreen: FC<Props> = ({ navigation }) => {
  const communityIds = useCommunityStore((state) => state.communityIds);

  const onPress = useCallback(
    (id: number) => () => {
      const userId = useCommunityStore.getState().communitiesById[id].userId;

      if (!userId) {
        navigation.navigate("AddProfile", {
          communityId: id,
        });
      } else {
        navigation.navigate("ClubHome", {
          communityId: id,
        });
      }
    },
    []
  );

  useEffect(() => {
    async function init() {
      try {
        const userCommunities = await fetchUserCommunities();
        useCommunityStore.getState().setCommunities(userCommunities.data);
      } catch (e) {
        console.log(e);
      }
    }
    init();
  }, []);

  return (
    <Container>
      <FlatList
        data={communityIds}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <ClubListItem id={item} onPress={onPress(item)} />
        )}
        contentContainerStyle={{ gap: 29, paddingHorizontal: 16 }}
      />
    </Container>
  );
};

export default ClubListScreen;
