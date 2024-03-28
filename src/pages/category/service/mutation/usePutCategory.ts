import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { CategoryType } from "../../../../type";
export const usePutCategory = (id: number) => {
  return useMutation({
    mutationKey: ["put-category", id],
    mutationFn: (data: FormData) => {
      return requst
        .put<CategoryType>(`/category/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};
