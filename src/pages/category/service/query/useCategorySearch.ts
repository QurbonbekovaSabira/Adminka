import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { ResponseType } from "../../../../type";

export const useCategorySearch = () => {
  return useMutation({
    mutationFn: (text: string | undefined) => {
      return requst
        .get<ResponseType>(`/category/?search=${text}`)
        .then((res) => res.data);
    },
  });
};
