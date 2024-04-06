import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const usePostProduct = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return requst
        .post("/product/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};
