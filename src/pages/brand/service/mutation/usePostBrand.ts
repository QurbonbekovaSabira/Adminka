import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const usePostBrand = () => {
  return useMutation({
    mutationKey: ["post-brand"],
    mutationFn: (data: FormData) => {
      return requst
        .post("/brand/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};
