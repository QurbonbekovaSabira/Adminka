import { Button } from "antd";
import { useNavigate } from "react-router-dom";
export const ProductVariant = () => {
  const navigate = useNavigate();

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
