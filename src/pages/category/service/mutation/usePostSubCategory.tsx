import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { CategoryType } from "../../../../type";
export const usePostSubCategory = () => {
  return useMutation({
    mutationKey: ["post-subcategory"],
    mutationFn: (data: FormData) => {
      console.log(data);

      return requst
        .post<CategoryType>(`/category/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};
