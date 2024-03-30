import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";
import { FormTypes } from "../types";
import React from "react";
import { useGetCategoryId } from "../../../service/query/useGetCategoryId";
export const EditAtribut: React.FC<{ id: string | undefined }> = (id) => {
  const [form] = Form.useForm();
  console.log(id);

  const { data } = useGetCategoryId(Number(id.id));
  const { data: newsss } = useGetCategoryId(Number(1000));
  const submit = (value: FormTypes) => {
    console.log(value);
  };
  console.log(data.attributes);
  console.log(newsss);

  return (
    <div>
      <Form
        onFinish={submit}
        layout="vertical"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        name="dynamic_form_complex"
        style={{ maxWidth: 600 }}
        autoComplete="off"
        initialValues={{ items: [{}] }}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
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
                  <Form.Item
                    // initialValue={item.title}
                    label="Name"
                    name={[field.name, "name"]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="List">
                    <Form.List name={[field.name, "list"]}>
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
                              <Form.Item
                                noStyle
                                name={[subField.name, "first"]}
                              >
                                <Input placeholder="first" />
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                              />
                            </Space>
                          ))}
                          <Button
                            type="dashed"
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

              <Button type="dashed" onClick={() => add()} block>
                + Add Item
              </Button>
            </div>
          )}
        </Form.List>

        <div style={{ marginTop: "25px" }}>
          <Button type="primary" size="large">
            Send
          </Button>
        </div>
      </Form>
    </div>
  );
};
