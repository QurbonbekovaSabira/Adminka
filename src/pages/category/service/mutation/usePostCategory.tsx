import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
interface Type {
  attributes: [];
  children: [];
  id: number;
  parent: null;
  title: string;
}

export const usePostCategory = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return requst
        .post<Type>("/category/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};
