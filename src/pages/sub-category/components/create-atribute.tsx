import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, message } from "antd";
import { ActiveType } from "../../category/type";
import { usePutAtribut } from "../service/mutation/usePutAtribut";
import { useNavigate } from "react-router-dom";
import React from "react";
import { FormTypes } from "../types";
export const CreateAtribute: React.FC<ActiveType> = (active) => {
  const [form] = Form.useForm();
  const navigete = useNavigate();
  const { mutate, isPending } = usePutAtribut();


  const submit = (value: FormTypes) => {

    const attributesNew: any = value.attributes?.map((item) => ({
      attribute_id: null,
      title: item?.title,
      values: item.values.map((i) => ({
        value: i.value,
        value_id: null,
      })),
    }));
    const data: any = {
      attributes: [...attributesNew],
      category_id: active.id,
    };

    mutate(data, {
      onSuccess: () => {
        message.success("Created atributs");
        navigete("/app/subCategory");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Form
      layout="vertical"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={{ attributes: [{}] }}
      onFinish={submit}
    >
      <Form.List name="attributes">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`Atribut ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item label="Atribut name" name={[field.name, "title"]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Atribut type">
                  <Form.List name={[field.name, "values"]}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, "value"]}>
                              <Input />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button
                          type="primary"
                          onClick={() => subOpt.add()}
                          block
                        >
                          + Add Sub Item
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            <Button
              style={{ border: "blue" }}
              type="primary"
              onClick={() => add()}
              block
            >
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>
      <div style={{ marginTop: "25px" }}>
        <Button
          loading={isPending}
          size="large"
          htmlType="submit"
          type="primary"
        >
          Send
        </Button>
      </div>
    </Form>
  );
};
