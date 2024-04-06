import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { ResponseType } from "../../../../type";

export const useGetCategoryFull = () => {
  return useQuery<ResponseType>({
    queryKey: ["get-category-full"],
    queryFn: () => requst.get("/category/").then((res) => res.data),
  });
};
