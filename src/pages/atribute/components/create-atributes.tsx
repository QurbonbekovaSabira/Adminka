import { Button, Card, Form, Input, Select, Space, message, Spin } from "antd";
import { useGetSubCategory } from "../../sub-category/service/query/useGetSubCategory";
import { CloseOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FormTypes } from "../../sub-category/types";
import type { SelectProps } from "antd";
import { usePostAtribute } from "../service/mutation/usePostAtribute";
import { client } from "../../../config/query-client";
interface Type {
  id: number;
  title: string;
}

export const CreateAtributes = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { data, isLoading } = useGetSubCategory();

  const { mutate } = usePostAtribute();
  const item: any = [];
  data?.results?.map((data: Type) =>
    item.push({
      value: Number(data.id),
      label: data.title,
      key: data.id,
    })
  );

  const options: SelectProps["options"] = [];
  data?.results.map((item) =>
    options.push({
      label: item.title,
      value: item.id, 
      emoji: item.title,
      desc: item.title,
    })
  );
  const [valueId, setValue] = React.useState<string[]>([]);

  const submit = (value: FormTypes) => {
    console.log(valueId);

    const atribute = [
      {
        title: value.attributes[0].title,
        values: value.attributes[0].values.map((item) => item.value),
        category: valueId.map((item) => Number(item)),
      },
    ];

    const newAtt = { attr_list: atribute };

    mutate(newAtt, {
      onSuccess: (res) => {
        console.log(res);
        message.success(res.status);
        navigate("/app/atribute");
        client.invalidateQueries({ queryKey: ["get-atribute"] });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleChanges = (value: string[]) => {
    setValue(value);
    console.log(value);
  };
  if (isLoading) {
    return <Spin fullscreen size="large" />;
  }
  return (
    <div>
      <Select
        size="large"
        mode="multiple"
        style={{ width: "50%", marginBottom: "25px" }}
        placeholder="select sub category"
        onChange={handleChanges}
        optionLabelProp="label"
        options={options}
        optionRender={(option) => (
          <Space>
            <span role="img" aria-label={option.data.label}></span>
            {option.data.desc}
          </Space>
        )}
      />
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
          {(fields) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Atribut ${field.name + 1}`}
                  key={field.key}
                >
                  <Form.Item label="Atribut name" name={[field.name, "title"]}>
                    <Input />
                  </Form.Item>

                  <Form.Item label="Atribut variant">
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
                              <Form.Item
                                noStyle
                                name={[subField.name, "value"]}
                              >
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
            </div>
          )}
        </Form.List>
        <div style={{ marginTop: "25px" }}>
          <Button
            // loading={isPending}
            size="large"
            htmlType="submit"
            type="primary"
          >
            Send
          </Button>
        </div>
      </Form>
    </div>
  );
};
