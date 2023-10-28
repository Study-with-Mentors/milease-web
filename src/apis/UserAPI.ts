import http, { toQueryParams } from "../utils/http";

export type SearchUserParams = {
  direction?: string,
  page?: number;
  pageSize?: number;
  orderBy?: string;
  lowerDate?: string;
  upperDate?: string;
};

export type GetUserResult = {
  id: number,
  fullName: string,
  imageUrl: string,
  createdTime: string,
  premium: boolean
}

export type GetUserPagingResult = {
  totalPages: number,
  totalCount: number,
  currentPage: number,
  values: GetUserResult[]
}

export const UserAPI = {
  getAll: async (SearchUserParams: SearchUserParams) => {
    var url;
    if (Object.keys(SearchUserParams).length == 0) {
      url = "/users";
    } else {
      url = `/users?${toQueryParams(SearchUserParams).toString()}`;
    }

    const res = await http.get(url);
    // console.log(res.data);
    return res.data;
  },
  getUserCount: async (SearchUserParams: SearchUserParams) => {
    var url;
    if (Object.keys(SearchUserParams).length == 0) {
      url = "/users/count";
    } else {
      url = `/users/count?${toQueryParams(SearchUserParams).toString()}`;
    }

    const res = await http.get(url);
    // console.log(res.data);
    return res.data;
  },
  getUserPremiumCount: async (searchUserParams: SearchUserParams) => {
    var url;
    if (Object.keys(searchUserParams).length == 0) {
      url = "/users/premium/count";
    } else {
      url = `/users/premium/count?${toQueryParams(searchUserParams).toString()}`;
    }

    const res = await http.get(url);
    // console.log(res.data);
    return res.data;
  },
};
