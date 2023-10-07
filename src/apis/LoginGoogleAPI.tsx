import http, { toQueryParams } from "../utils/http";

export const LoginGoogleAPI = {
    loginGoogle: async (token: string) => {
        const res = await http.post<string>(`/auth/google`, `${token}`, {
            headers: {
                "Content-Type": "text/plain",
            },
        });
        return res.data;
    },
}