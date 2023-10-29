import http from "../utils/http";

export const TransactionAPI = {
    approveAPI: async (id: number[]) => {
        const res = await http.post<string>(`/travelers/status`, id);
        return res.data;
    },
}