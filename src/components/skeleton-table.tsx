import { Skeleton, Space } from "antd";
export const SkeletonTable = () => {
  return (
    <>
      <div style={{ paddingTop: "35px" }}>
        <div style={{ marginBottom: "30px" }}>
          <Skeleton.Button block={false} active={false} size="large" />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            marginBottom: "20px",
          }}
        >
          <Skeleton.Input active={true} size="large" />
          <Skeleton.Button block={false} active={false} size="default" />
          <Skeleton.Image active />
          <Space>
            <Skeleton.Button block={false} active={false} size="default" />
            <Skeleton.Button block={false} active={false} size="default" />
          </Space>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            marginBottom: "20px",
          }}
        >
          <Skeleton.Input active={true} size="large" />
          <Skeleton.Button block={false} active={false} size="default" />
          <Skeleton.Image active />
          <Space>
            <Skeleton.Button block={false} active={false} size="default" />
            <Skeleton.Button block={false} active={false} size="default" />
          </Space>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            marginBottom: "20px",
          }}
        >
          <Skeleton.Input active={true} size="large" />
          <Skeleton.Button block={false} active={false} size="default" />
          <Skeleton.Image active />
          <Space>
            <Skeleton.Button block={false} active={false} size="default" />
            <Skeleton.Button block={false} active={false} size="default" />
          </Space>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            marginBottom: "20px",
          }}
        >
          <Skeleton.Input active={true} size="large" />
          <Skeleton.Button block={false} active={false} size="default" />
          <Skeleton.Image active />
          <Space>
            <Skeleton.Button block={false} active={false} size="default" />
            <Skeleton.Button block={false} active={false} size="default" />
          </Space>
        </div>
      </div>
    </>
  );
};
