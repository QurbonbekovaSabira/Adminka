import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const usePatchProduct = (id: number | undefined) => {
  return useMutation({
    mutationKey: ["patch-product"],
    mutationFn: (data: FormData) =>
      requst
        .patch(`/product/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
