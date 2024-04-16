import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { ResponseType } from "../../../../type";

export const useGetSearchCategory = (text: string | undefined) => {
  return useQuery({
    queryKey: ["search-product", text],
    queryFn: () => {
      return requst
        .get<ResponseType>(`/category/?search=${text}`)
        .then((res) => res.data);
    },
  });
};
