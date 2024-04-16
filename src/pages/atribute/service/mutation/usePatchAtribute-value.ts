import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

interface Type {
  id: number;
  attribute: string;
  value: string[];
}
interface Props {
  data: {
    count: number;
    next: null | string;
    previous: null | string;
    results: {
      id: number | undefined;
      title: string;
      image: string;
      children: { id: string; title: string; image: string }[];
    }[];
  };
  pageSize: number;
}
export const usePatchAtributeValue = (id: number | null) => {
  return useMutation({
    mutationKey: ["patch-atribute-value"],
    mutationFn: (data: Type) => {
      return requst
        .patch<Props>(`/attribute/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};
