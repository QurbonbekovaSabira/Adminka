import { useGetSubCategory } from "./service/query/useGetSubCategory";

export const SubCategory = () => {
  const { data, isLoading } = useGetSubCategory();
  console.log(data.results);

  return <div>SubCategory</div>;
};
