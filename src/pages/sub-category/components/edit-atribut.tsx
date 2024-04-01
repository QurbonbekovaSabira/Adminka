import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, message } from "antd";
import { FormTypes } from "../types";
import React from "react";
import { useGetCategoryId } from "../../../service/query/useGetCategoryId";
import { useDeleteAtributeValues } from "../service/mutation/useDeleteAtributeValues";
import { useDeleteAtribute } from "../service/mutation/useDeleteAtribute";
import { usePutAtribut } from "../service/mutation/usePutAtribut";
import { AtributType } from "../../../type";
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
  const { mutate } = useDeleteAtributeValues(deleteId);
  const { mutate: atributeMutate } = useDeleteAtribute(deleteAtributeId);
  const { data } = useGetCategoryId(Number(id));
  console.log(data.attributes);

  const submit = (value: FormTypes) => {
    let newAtribute = [];
    console.log(value);

    for (let item of value?.attributes) {
      for (let atribut of data.attributes) {
        if (item.title === atribut.title) {
          newAtribute.push({
            title: item.title,
            attribute_id: atribut.id,
            values: item.values.map((key, i) =>
              key.value === atribut?.values[i]?.title
                ? { value: key.value, value_id: atribut.values[i].id }
                : { value: key.value, value_id: null }
            ),
          });
        } else {
          newAtribute.push({
            attribute_id: null,
            title: item.title,
            values: item.values.map((newValue) => ({
              value: newValue.value,
              value_id: null,
            })),
          });
        }
      }
    }

    const newAtributeValue: any = {
      attributes: [...newAtribute],
      category_id: Number(id),
    };

    editMutate(newAtributeValue, {
      onSuccess: () => {
        message.success("Successfully Edited");
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
        message.success("Successfully");
      },
      onError(error) {
        message.error(error.message);
      },
    });
  };
  const deleteAtribute = (id: number) => {
    console.log(id);
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
      <Form
        onFinish={submit}
        layout="vertical"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        name="dynamic_form_complex"
        style={{ maxWidth: 600 }}
        autoComplete="off"
        initialValues={{ attributes: [{}] }}
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
                    <>
                      {!data?.attributes[field.name] && (
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      )}
                      {data.attributes[field.name] &&
                        !(data?.attributes[field.name].values.length > 0) && (
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
                  <Form.Item
                    initialValue={data?.attributes[field.name]?.title}
                    label="Name"
                    name={[field.name, "title"]}
                  >
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
                                initialValue={
                                  data?.attributes[field.name]?.values[
                                    subField.key
                                  ]?.value
                                }
                                noStyle
                                name={[subField.name, "value"]}
                              >
                                <Input placeholder="value" />
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                  <>
                                    {data?.attributes[field.name]?.values[
                                      subField.key
                                    ] &&
                                      deleteAtributValue(
                                        data?.attributes[field.name]?.values[
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
          <Button htmlType="submit" type="primary" size="large">
            Send
          </Button>
        </div>
      </Form>
    </div>
  );
};
