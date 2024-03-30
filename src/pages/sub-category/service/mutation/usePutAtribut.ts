import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { AtributType } from "../../../../type";

export const usePutAtribut = () => {
  return useMutation({
    mutationKey: ["patch-atribut"],
    mutationFn: (data: AtributType) => {
      return requst.patch("/api/category_edit/", data).then((res) => res.data);
    },
  });
};
