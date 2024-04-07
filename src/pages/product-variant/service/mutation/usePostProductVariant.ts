import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

interface Type {
  is_available: boolean;
  title: string;
  product: number;
  attribute_value: number[];
  price: string;
  quantity: number;
  other_detail?: string;
}

export const usePostProductVariant = () => {
  return useMutation({
    mutationFn: () => requst.post<Type>("/product_variant/"),
  });
};
