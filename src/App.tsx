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
          <GoogleOAuthProvider clientId={process.env.VITE_GOOGLE_CLIENT as string}>
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
