import { Community } from "@/libs/apis/fetchCommunities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CommunityData = Community & {
  joined: boolean;
  joinedAt?: Date;
};

type CommunityStoreState = {
  communitiesById: Record<number, CommunityData>; // ID 기반 저장소
  communityIds: number[]; // ID 목록
};

type CommunityStoreActions = {
  setCommunities: (data: CommunityData[]) => void;
  toggleJoinStatus: (id: number) => void; // 예시로 추가된 액션
};

export const useCommunityStore = create(
  persist<CommunityStoreState & CommunityStoreActions>(
    (set) => ({
      communitiesById: {},
      communityIds: [],
      setCommunities: (data) => {
        const communitiesById = data.reduce<Record<number, CommunityData>>(
          (acc, community) => {
            acc[community.id] = community; // ID를 키로 사용
            return acc;
          },
          {}
        );
        const communityIds = data.map((community) => community.id);

        set({
          communitiesById,
          communityIds,
        });
      },
      toggleJoinStatus: (id) => {
        set((state) => {
          const community = state.communitiesById[id];
          if (!community) return state;

          return {
            ...state,
            communitiesById: {
              ...state.communitiesById,
              [id]: {
                ...community,
                joined: !community.joined,
                joinedAt: community.joined ? undefined : new Date(),
              },
            },
          };
        });
      },
    }),
    {
      name: "community",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
