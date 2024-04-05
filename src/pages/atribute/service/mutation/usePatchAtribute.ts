import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const usePatchAtribute = (id: number) => {
  return useMutation({
    mutationFn: (data: any) => {
      return requst.patch(`/attribute/${id}/`, data);
    },
  });
};
