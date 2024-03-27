import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const useDeleteCategory = (
  data: {
    id: number;
    title: string;
    image: string;
  } | null
) => {
  console.log(data);

  return useMutation({
    mutationKey: ["delete-category"],
    mutationFn: () => {
      return requst
        .delete(`/category/${String(data?.id)}/`)
        .then((res) => res.data);
    },
  });
};
