import { useMutation } from "@tanstack/react-query";
import { requst } from "../../config/request";

export const useDeleteAtribute = (id: number | null) => {
  return useMutation({
    mutationKey: ["delete-atribute"],
    mutationFn: () => {
      return requst
        .delete(`/attribute/${id}/`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};
