import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Spin,  } from "antd";
import { FormTypes } from "../../sub-category/types";
import { useGetAtributeId } from "../service/query/useGetAtributeId";
import { useParams } from "react-router-dom";
export const AtributePageEditAtribute = () => {
  const { id } = useParams();

  const [form] = Form.useForm();
  const { data, isLoading } = useGetAtributeId(Number(id));
  console.log(data?.data);


  const submit = (value: FormTypes) => {
    console.log(value);
  };

 

  if (isLoading) {
    return <Spin fullscreen size="large" />;
  }
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
      >
        <Form.List name="attributes">
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
                  <Form.Item label="Name" name={[field.name, "title"]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="List">
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
                                <Input placeholder="value" />
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                  // <>
                                  //   {data?.data.values[
                                  //     subField.key
                                  //   ] &&
                                  //     deleteAtributValue(
                                  //       data.data.values[
                                  //         subField.key
                                  //       ]?.id
                                  //     )}
                                  // </>;
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
          <Button
            htmlType="submit"
            type="primary"
            size="large"
          >
            Send
          </Button>
        </div>
      </Form>
    </div>
  );
};
