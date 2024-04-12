import { Section } from "../type/section";

export const setData = (data: Section[]) => ({
  type: "SET_DATA",
  payload: data,
});

export const setUserUrl = (url: string) => ({
  type: "SET_USER_URL",
  payload: url,
});
