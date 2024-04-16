import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
interface Type {
  id: number;
  title: string;
  category: number[];
}

export const usePatchAtribute = (id: number) => {
  return useMutation({
    mutationFn: (data: Type) => {
      return requst.patch(`/attribute/${id}/`, data);
    },
  });
};
