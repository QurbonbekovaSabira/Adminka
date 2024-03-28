import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const useDeleteBrand = (id: number | undefined) => {
  return useMutation({
    mutationKey: ["delete-brand"],
    mutationFn: () => {
      return requst.delete(`/brand/${id}/`).then((res) => res.data);
    },
  });
};
