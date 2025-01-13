import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export type RequestParams = {
  userId: string;
  upassword: string;
};

export type ResponseParams = {
  token: string;
  status: string;
};

const authenticate = async ({
  userId,
  upassword,
}: RequestParams): Promise<ResponseParams> => {
  try {
    const response = await axiosClient.post<
      ResponseParams,
      AxiosResponse<ResponseParams>,
      RequestParams
    >("auth/authenticate", {
      userId,
      upassword,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export default authenticate;
