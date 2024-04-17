import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { ProductVariantType } from "../../type";
export const useGetProductVariant = () => {
  return useQuery({
    queryKey: ["get-product-variant"],
    queryFn: () =>
      requst
        .get<ProductVariantType>("/product_variant/")
        .then((res) => res.data),
  });
};
