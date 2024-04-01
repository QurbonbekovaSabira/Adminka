import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const useDeleteAtributeValues = (id: number | null) => {
  return useMutation({
    mutationKey: ["delete-atribut-values"],
    mutationFn: () => {
      return requst
        .delete(`/attribute-value/${id}/`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};
