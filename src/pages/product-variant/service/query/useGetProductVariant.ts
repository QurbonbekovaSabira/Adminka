import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const useGetProductVariant = () => {
  return useQuery({
    queryKey: ["get-product-variant"],
    queryFn: () => requst.get("/product_variant/").then((res) => res.data),
  });
};
