import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
import AppRoute from "./routes/AppRoute";
import { BrowserRouter } from "react-router-dom";

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
          <BrowserRouter>
            <AppRoute />
          </BrowserRouter>
        </QueryClientProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
