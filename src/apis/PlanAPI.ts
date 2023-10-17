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
};
