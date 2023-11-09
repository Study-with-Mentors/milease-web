import http, { toQueryParams } from "../utils/http";

export type SearchPlanParams = {
  direction?: string,
  page?: number;
  pageSize?: number;
  name?: string;
  orderBy?: string;
  lowerDate?: string;
  upperDate?: string;
};

export type GetPlanResult = {
  id: number;
  name: string;
  start: string;
  end: string;
  status: string;
};

export type GetPlansParams = {
  pageSize: number;
  name?: string;
  direction?: string;
  page?: number;
  lowerDate?: string;
  upperDate?: string;
  orderBy?: string;
};

export type GetPlanPagingResult = {
  totalPages: number;
  totalCount: number;
  currentPage: number;
  values: GetPlanResult[];
};

export const PlanAPI = {
  getPlanCount: async (searchPlanParams: SearchPlanParams) => {
    var url;
    if (Object.keys(searchPlanParams).length == 0) {
      url = "/plans/count";
    } else {
      url = `/plans/count?${toQueryParams(searchPlanParams).toString()}`;
    }

    const res = await http.get(url);
    // console.log(res.data);
    return res.data;
  },
  getAllPlans: async (params: GetPlansParams) => {
    const token = localStorage.getItem("access_token")
    const res = await http.get<GetPlanPagingResult>(
      `/plans?${toQueryParams(params)}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  },
};
