import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const useDeleteProduct = (id: number | undefined) => {
  return useMutation({
    mutationFn: () => {
      return requst.delete(`/product/${id}/`).then((res) => res.data);
    },
  });
};
