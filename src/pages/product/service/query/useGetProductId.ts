import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { ProductId } from "../../type";

export const useGetProductId = (id: number) => {
  return useQuery({
    queryKey: ["get-product-id", id],
    queryFn: () => {
      return requst.get<ProductId>(`/product/${id}/`).then((res) => res.data);
    },
  });
};
