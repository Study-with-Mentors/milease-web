import { UseQueryResult, useQuery } from "react-query";
import {
  GetPlanPagingResult,
  GetPlansParams,
  PlanAPI,
} from "../apis/PlanAPI";

export const useGetAllPlans = (params: GetPlansParams) => {
  const {
    isError,
    isLoading,
    data,
    error,
    refetch,
  }: UseQueryResult<GetPlanPagingResult, Error> = useQuery({
    queryKey: ["plans", params?.name],
    queryFn: async () => {
      return await PlanAPI.getAllPlans(params);
    },
  });

  return { isError, isLoading, data, error, refetch };
};
