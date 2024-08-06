import { authApi } from "../../data/authApi";
import { User } from "../entities/User";

export const loginUser = async (
  username: string,
  password: string,
): Promise<User> => {
  return await authApi.login(username, password);
};
