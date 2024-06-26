import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
export const useGetSearchBrand = (text: string | undefined) => {
  return useQuery({
    queryKey: ["search-brand", text],
    queryFn: () => requst.get(`/brand/?search=${text}`).then((res) => res.data),
  });
};
