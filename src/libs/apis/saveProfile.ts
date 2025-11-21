import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export type Profile = {
  id: number;
  communityId: number;
  userId: number;
  sortNo: number;
  nickName: string;
  status: string;
  createdAt: string;
  image: string;
  imageStr: string;
  type: string;
};

export type CommunityUserDTO = {
  userId: number;
  communityId: number;
  nickName: string;
  userName?: string;
  email?: string;
  image: string;
};

export type RequestParams = {
  communityId: string;
  nickName: string;
  sortNo: string;
  imageStr: string;
  id?: number; // 프로필 수정 모드일 때 사용
};

export type ResponseParams = {
  message: string;
  status: string;
  data: Profile | CommunityUserDTO;
};

const saveProfile = async ({
  communityId,
  nickName,
  sortNo,
  imageStr,
  id,
}: RequestParams): Promise<ResponseParams> => {
  try {
    // 프로필 수정 모드일 때는 user/edit 엔드포인트 사용
    const endpoint = id ? "community/user/edit" : "community/user/add";
    
    const response = await axiosClient.post<
      ResponseParams,
      AxiosResponse<ResponseParams>,
      RequestParams
    >(endpoint, {
      communityId,
      nickName,
      sortNo,
      imageStr,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export default saveProfile;
