import { UserData } from "./fakerUtils";

export let createdUser: UserData;

export const setCreatedUser = (
  user: UserData,
): void => {

  createdUser = user;
};