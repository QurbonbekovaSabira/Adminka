import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const useGetSubCategory = () => {
  return useQuery({
    queryKey: ["get-subcategory"],
    queryFn: () => {
      return requst.get("/api/subcategory/").then((res) => res.data);
    },
  });
};
