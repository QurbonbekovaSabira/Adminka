import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const usePostBanners = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      requst
        .post("/banner/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
