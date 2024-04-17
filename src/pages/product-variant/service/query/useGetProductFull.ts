import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { ProductVariantType } from "../../type";
export const useGetProductFull = () => {
  return useQuery({
    queryKey: ["get-product-full"],
    queryFn: () =>
      requst.get<ProductVariantType>("/product/").then((res) => res.data),
  });
};
