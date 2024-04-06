import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { LoginType } from "../../type";

export const usePostAdmin = () => {
  return useMutation({
    mutationKey: ["get-token"],
    mutationFn: (data: LoginType) => {
      return requst.post("/api/admin-login/", data).then((res) => res.data);
    },
  });
};
