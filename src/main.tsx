import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "./config/query-client.ts";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
