import ClubListItem from "@/components/ClubListItem";
import axiosClient from "@/libs/axiosClient";
import { RootStackParamList } from "@/navigators/RootStackNavigator";
import styled from "@emotion/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useCallback, useEffect, useState } from "react";
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
  const [clubList, setClubList] = useState<Data[]>([]);

  const onPress = useCallback(
    (id: number) => async () => {
      try {
        const response = await axiosClient.post("community/list/user", {});

        const filtered = response.data.data.filter(
          (item: any) => item.communityId === id && !!item.userId
        );

        if (filtered.length === 0) {
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
      const response = await axiosClient.get("community/list");
      setClubList(response.data.data);
    }
    init();
  }, []);

  return (
    <Container>
      {clubList.length > 0 && (
        <FlatList
          data={clubList}
          renderItem={({ item }) => (
            <ClubListItem
              title={item.title}
              desc={item.summary}
              onPress={onPress(item.id)}
              imageStr={`${item.type}${item.image}`}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </Container>
  );
};

export default ClubListScreen;
