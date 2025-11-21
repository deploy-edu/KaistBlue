import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export type UserCommunity = {
  summary: string;
  sortNo?: number;
  image: string;
  nickName?: string;
  communityId: number;
  title: string;
  type: string;
  userId?: number;
  profileImage?: string;
  profileImageType?: string;
};

export type ResponseParams = {
  message: string;
  status: string;
  data: UserCommunity[];
};

const fetchUserCommunities = async (): Promise<ResponseParams> => {
  try {
    const response = await axiosClient.post<
      ResponseParams,
      AxiosResponse<ResponseParams>
    >("community/list/user");
    return response.data;
  } catch (e) {
    throw e;
  }
};

export default fetchUserCommunities;
