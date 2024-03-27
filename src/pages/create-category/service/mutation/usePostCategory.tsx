import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
// import { CategoryCreateType } from "../../type";
import { CategoryType } from "../../../category/type";
export const usePostCategory = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      console.log(data);

      return requst
        .post<CategoryType>("/category/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};
