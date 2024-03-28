import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
export const usePostCategory = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return requst
        .post("/category/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};
