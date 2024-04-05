import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Spin, message } from "antd";
import { FormTypes } from "../../sub-category/types";
import React from "react";
import { useGetCategoryId } from "../../../service/query/useGetCategoryId";
import { useDeleteAtributeValues } from "../../sub-category/service/mutation/useDeleteAtributeValues";
import { usePutAtribut } from "../../sub-category/service/mutation/usePutAtribut";
import { useNavigate } from "react-router-dom";
import { client } from "../../../config/query-client";
import { useParams } from "react-router-dom";
import { useGetAtributeId } from "../service/query/useGetAtributeId";

export const AtributePageEditAtribute = () => {
  const { id } = useParams();
  const [deleteId, setDeleteId] = React.useState<null | number>(null);

  const [form] = Form.useForm();
  const { mutate: editMutate, isPending: editPending } = usePutAtribut();
  const { mutate } = useDeleteAtributeValues(deleteId);
  const { data, isLoading } = useGetAtributeId(Number(id));
  console.log(data?.data);

  // const newData=

  const navigete = useNavigate();

  const submit = (value: FormTypes) => {
    console.log(value);
  };

  const deleteAtributValue = (id: number) => {
    setDeleteId(id);
    mutate(undefined, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["category-id"] });
        message.success("Successfully");
      },
      onError(error) {
        message.error(error.message);
      },
    });
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
            loading={editPending}
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
