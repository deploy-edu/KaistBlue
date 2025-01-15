import ClubListItem from "@/components/ClubListItem";
import fetchCommunities from "@/libs/apis/fetchCommunities";
import fetchUserCommunities from "@/libs/apis/fetchUserCommunities";
import { RootStackParamList } from "@/navigators/RootStackNavigator";
import { CommunityData, useCommunityStore } from "@/stores/useCommunityStore";
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
      const joined = useCommunityStore.getState().communitiesById[id].joined;
      console.log("joined", joined);

      if (!joined) {
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
        const communities = await fetchCommunities();
        const userCommunities = await fetchUserCommunities();
        if (communities.data.length > 0) {
          const data = communities.data.map<CommunityData>((community) => {
            const joined = userCommunities.data.find(
              (userCommunity) => userCommunity.communityId === community.id
            );
            return { ...community, joined: !!joined };
          });
          useCommunityStore.getState().setCommunities(data);
        }

        // useCommunityStore.getState().setCommunities(communities);
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
