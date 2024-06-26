import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Spin, message } from "antd";
import { FormTypes } from "../types";
import React from "react";
import { useGetCategoryId } from "../../../service/query/useGetCategoryId";
import { useDeleteAtributeValues } from "../service/mutation/useDeleteAtributeValues";
import { useDeleteAtribute } from "../../../service/mutation/useDeleteAtribute";
import { usePutAtribut } from "../service/mutation/usePutAtribut";
import { useNavigate } from "react-router-dom";
import { client } from "../../../config/query-client";
interface Props {
  id: string | undefined;
}

export const EditAtribut: React.FC<Props> = ({ id }) => {
  const [deleteId, setDeleteId] = React.useState<null | number>(null);
  const [deleteAtributeId, setDeleteAtribute] = React.useState<null | number>(
    null
  );
  const [form] = Form.useForm();
  const { mutate: editMutate, isPending: editPending } = usePutAtribut();
  const { mutate, isPending } = useDeleteAtributeValues(deleteId);
  const { mutate: atributeMutate, isPending: atributePending } =
    useDeleteAtribute(deleteAtributeId);
  const { data } = useGetCategoryId(Number(id));

  const navigete = useNavigate();

  const submit = (value: FormTypes) => {
    let newAtribute = value.attributes.map((item, i) => ({
      attribute_id: data?.attributes[i]?.id ? data.attributes[i].id : null,
      title: data?.attributes[i]?.title
        ? data.attributes[i]?.title
        : item.title,
      values: item.values.map((title, j) => ({
        value: data?.attributes[i]?.values[j]?.value
          ? data.attributes[i]?.values[j]?.value
          : title.value,
        value_id: data?.attributes[i]?.values[j]?.id
          ? data.attributes[i]?.values[j]?.id
          : null,
      })),
    }));

    const newAtributeValue: any = {
      attributes: [...newAtribute],
      category_id: Number(id),
    };

    editMutate(newAtributeValue, {
      onSuccess: () => {
        message.success("Successfully Edited");
        navigete("/app/subCategory");
      },
      onError: (error) => {
        message.error(error.message);
        console.log(error);
      },
    });
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
  const deleteAtribute = (id: number) => {
    setDeleteAtribute(id);
    atributeMutate(undefined, {
      onSuccess: () => {
        message.success("Successfully");
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };

  return (
    <div>
      {(isPending || atributePending) && <Spin fullscreen size="large" />}
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
        <Form.List name="attributes" initialValue={data?.attributes}>
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
                    <>
                      {!data?.attributes[field.name] && (
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      )}
                      {data?.attributes[field.name] &&
                        data.attributes[field.name].values.length <= 0 && (
                          <CloseOutlined
                            onClick={() => {
                              remove(field.name);
                              {
                                !(
                                  data?.attributes[field.name]?.values.length >
                                  0
                                ) &&
                                  deleteAtribute(
                                    data?.attributes[field.name]?.id
                                  );
                              }
                            }}
                          />
                        )}
                    </>
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
                                  <>
                                    {data?.attributes[field.key]?.values[
                                      subField.key
                                    ] &&
                                      deleteAtributValue(
                                        data?.attributes[field.key]?.values[
                                          subField.key
                                        ]?.id
                                      )}
                                  </>;
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
