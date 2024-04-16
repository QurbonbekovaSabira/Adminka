import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { BannerTypeResponce } from "../../tye";
export const usePatchBannners = (id: number) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      requst
        .patch<BannerTypeResponce>(`/banner/${id}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
  });
};
