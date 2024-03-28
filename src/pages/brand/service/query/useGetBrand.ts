import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const useGetBrand = () => {
  return useQuery({
    queryKey: ["get-brands"],
    queryFn: () => {
      return requst.get("/brand/").then((res) => res.data);
    },
  });
};
