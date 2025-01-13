import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export type RequestParams = {
  userId: string;
  userName: string;
  upassword: string;
  email: string;
};

export type ResponseParams = {
  token: string;
  status: string;
};

const signup = async ({
  userId,
  userName,
  upassword,
  email,
}: RequestParams): Promise<ResponseParams> => {
  try {
    const response = await axiosClient.post<
      ResponseParams,
      AxiosResponse<ResponseParams>,
      RequestParams
    >("api/signup", {
      userId,
      upassword,
      userName,
      email,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export default signup;
