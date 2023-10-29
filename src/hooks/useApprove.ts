import { useMutation } from "react-query";
import { TransactionAPI } from "../apis/TransactionAPI";

export const useApprove = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "approvePremium",
    mutationFn: async (id: number[]) => {
      return await TransactionAPI.approveAPI(id);
    },
  });

  return { mutate, isLoading, error, data };
};
