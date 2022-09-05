import RouteConfig from "./Services/RouteConfig";
import "./App.scss";
import Header from "./components/Header/Header";
import { QueryClientProvider, QueryClient } from "react-query"; 
import { ReactQueryDevtools } from "react-query/devtools"; 

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Header />
        <RouteConfig />
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right'></ReactQueryDevtools>
      </QueryClientProvider>
    </div>
  );
}



export default App;
