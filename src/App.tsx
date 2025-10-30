import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootRoutes from "./RootRoutes";
import ApiErrorHandler from "./components/common/ApiErrorHandler";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ApiErrorHandler>
          <RootRoutes />
        </ApiErrorHandler>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
