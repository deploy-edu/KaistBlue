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
  flex: 1;
  padding-top: 20px;
`;

type Data = {
  id: number;
  title: string;
  summary: string;
  status?: string;
  createdAt: Date;
  image: string;
  imageStr?: string;
  type: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "ClubList">;
const ClubListScreen: FC<Props> = ({ navigation }) => {
  const communityIds = useCommunityStore((state) => state.communityIds);

  const onPress = useCallback(
    (id: number) => async () => {
      try {
        const joined = useCommunityStore.getState().communitiesById[id].joined;

        if (!joined) {
          navigation.navigate("AddProfile", {
            communityId: id,
          });
        } else {
          navigation.navigate("ClubHome", { communityId: id });
        }
      } catch (e) {
        console.error(e);
      }
    },
    [navigation]
  );

  useEffect(() => {
    async function init() {
      try {
        const communities = await fetchCommunities();
        const userCommunities = await fetchUserCommunities();

        if (communities.data.length > 0) {
          const data = communities.data.map<CommunityData>((community) => {
            const found = userCommunities.data.find(
              (item: any) => item.communityId === community.id
            );
            return {
              ...community,
              joined: !!found,
            };
          });
          useCommunityStore.getState().setCommunities(data);
        }
      } catch (e) {
        console.error(e);
      }
    }
    init();
  }, []);

  return (
    <Container>
      {communityIds.length > 0 && (
        <FlatList
          data={communityIds}
          renderItem={({ item }) => (
            <ClubListItem id={item} onPress={onPress(item)} />
          )}
          keyExtractor={(item) => item.toString()}
        />
      )}
    </Container>
  );
};

export default ClubListScreen;
