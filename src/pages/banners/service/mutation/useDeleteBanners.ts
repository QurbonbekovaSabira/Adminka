import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const useDeleteBanners = (id: null | number) => {
  return useMutation({
    mutationFn: () => requst.delete(`/banner/${id}/`).then((res) => res.data),
  });
};
