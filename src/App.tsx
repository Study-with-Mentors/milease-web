import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
import AppRoute from "./routes/AppRoute";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Poppins",
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId="660757934763-6rcnn61l2ctd81jdk15fb0prmda55u9u.apps.googleusercontent.com">
            <BrowserRouter>
              <AppRoute />
            </BrowserRouter>
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
