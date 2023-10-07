import { useMutation } from "react-query";
import { LoginGoogleAPI } from "../apis/LoginGoogleAPI";

export const useLoginGoogle = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "loginGoogle",
    mutationFn: async (token: string) => {
      return await LoginGoogleAPI.loginGoogle(token);
    },
  });

  return { mutate, isLoading, error, data };
};
