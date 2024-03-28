import { useParams } from "react-router-dom";
import { useGetCategoryId } from "../../../service/query/useGetCategoryId";
export const EditSubCategory = () => {
  const { id } = useParams();
  console.log(id);
  const { data } = useGetCategoryId(Number(id));
  console.log(data);

  return <div>EditSubCategory</div>;
};
