import { UserCommunity } from "@/libs/apis/fetchUserCommunities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CommunityData = UserCommunity;

type CommunityStoreState = {
  communitiesById: Record<number, CommunityData>; // ID 기반 저장소
  communityIds: number[]; // ID 목록
};

type CommunityStoreActions = {
  setCommunities: (data: CommunityData[]) => void;
  updateCommunity: (data: CommunityData) => void;
  incrementMemberCount: (communityId: number) => void;
  decrementMemberCount: (communityId: number) => void;
};

export const useCommunityStore = create(
  persist<CommunityStoreState & CommunityStoreActions>(
    (set, get) => ({
      communitiesById: {},
      communityIds: [],
      setCommunities: (data) => {
        const communitiesById = data.reduce<Record<number, CommunityData>>(
          (acc, community) => {
            acc[community.communityId] = community; // ID를 키로 사용
            return acc;
          },
          {}
        );
        const communityIds = data.map((community) => community.communityId);

        set({
          communitiesById,
          communityIds,
        });
      },
      updateCommunity: (data) => {
        set({
          communitiesById: {
            ...get().communitiesById,
            [data.communityId]: data,
          },
        });
      },
      incrementMemberCount: (communityId) => {
        const community = get().communitiesById[communityId];
        if (community) {
          set({
            communitiesById: {
              ...get().communitiesById,
              [communityId]: {
                ...community,
                memberCount: (community.memberCount || 0) + 1,
              },
            },
          });
        }
      },
      decrementMemberCount: (communityId) => {
        const community = get().communitiesById[communityId];
        if (community) {
          set({
            communitiesById: {
              ...get().communitiesById,
              [communityId]: {
                ...community,
                memberCount: Math.max((community.memberCount || 0) - 1, 0),
              },
            },
          });
        }
      },
    }),
    {
      name: "community",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
