import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
interface Type {
  attributes: {
    attribut_id: null | number;
    title: string;
    values: {
      value_id: null | number;
      value: string;
    }[];
  }[];
}
export const usePutAtribut = () => {
  return useMutation({
    mutationKey: ["patch-atribut"],
    mutationFn: (data: Type) => {
      return requst
        .patch<Type>("/api/category_edit/", data)
        .then((res) => res.data);
    },
  });
};
