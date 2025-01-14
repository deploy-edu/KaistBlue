import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export type UserCommunity = {
  summary: string;
  image: string;
  communityId: number;
  title: string;
  type: string;
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
