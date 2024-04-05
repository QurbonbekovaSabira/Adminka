import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const useGetAtributeId = (id: number | null) => {
  return useQuery({
    queryKey: ["get-atribute-id"],
    queryFn: () => {
      return requst.get(`/attribute/${id}/`);
    },
  });
};
