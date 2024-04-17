import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetProductVariant } from "./service/query/useGetProductVariant";
export const ProductVariant = () => {
  const navigate = useNavigate();
  const { data } = useGetProductVariant();
  console.log(data?.results);

  return (
    <div>
      <Button
        onClick={() => navigate("/app/create-product-variant")}
        style={{ marginBottom: "30px" }}
        type="primary"
        size="large"
      >
        Create Product Variant
      </Button>
    </div>
  );
};
