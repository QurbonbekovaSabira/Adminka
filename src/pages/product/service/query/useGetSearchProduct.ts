import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { ResponseType } from "../../../../type";
export const useGetSearchProduct = (text: string) => {
  return useQuery({
    queryKey: ["search-product"],
    queryFn: () => {
      return requst
        .get<ResponseType>(`/product/?search=${text}`)
        .then((res) => res.data);
    },
  });
};
