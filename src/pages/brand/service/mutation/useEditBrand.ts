import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { CategoryType } from "../../../../type";

export const useEditBrand = (id: number) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      requst.put<CategoryType>(`/brand/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
  });
};
