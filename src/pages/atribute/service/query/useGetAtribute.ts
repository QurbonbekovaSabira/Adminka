import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

interface GetType {
  count: number;
  previous: null | number;
  results: {
    id: number;
    title: string;
    category: number[];
    category_title: {
      title: string;
    }[];
  }[];
}

export const useGetAtribute = (page: number = 1) => {
  return useQuery({
    queryKey: ["get-atribute", page],
    queryFn: () => {
      return requst
        .get<GetType>("/attribute/", {
          params: {
            offset: page,
            limit: 5,
          },
        })
        .then((res) => {
          return {
            data: res.data,
            pageSize: Math.ceil(res.data.count),
          };
        });
    },
  });
};
