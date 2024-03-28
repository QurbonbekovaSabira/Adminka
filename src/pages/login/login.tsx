import { Input, Form } from "antd";
import { Button } from "antd";
import React from "react";
import { usePostAdmin } from "./service/mutation/usePostAdmin";
import { useNavigate } from "react-router-dom";
import { Cookies } from "typescript-cookie";
import { useEffect } from "react";
type FieldType = {
  phone_number: string;
  password: string;
};
export const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("user");
    if (token) {
      navigate("/app");
    }
  }, []);
  const { mutate, isPending } = usePostAdmin();
  const submit = (value: FieldType) => {
    mutate(value, {
      onSuccess: (res) => {
        Cookies.set("user", res.token, { expires: 7 });
        navigate("/app", { replace: true });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <section className="login">
      <div className="login_box">
        <Form
          name="basic"
          layout="vertical"
          style={{ maxWidth: 600 }}
          initialValues={{}}
          onFinish={submit}
        >
          <Form.Item
            label="number"
            name="phone_number"
            initialValue={"+998977109944"}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            initialValue={"87654321"}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button loading={isPending} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
