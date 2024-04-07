import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const useGetProductFull = () => {
  return useQuery({
    queryKey: ["get-product-full"],
    queryFn: () => requst.get("/product/").then((res) => res.data),
  });
};
