import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const usePatchAtributeValue = (id: number | null) => {
  return useMutation({
    mutationKey: ["patch-atribute-value"],
    mutationFn: (data: any) => {
      return requst.patch(`/attribute/${id}`, data,{headers:{
        "Content-Type":"multipart/form-data"
      }}).then((res) => res.data);
    },
  });
};
