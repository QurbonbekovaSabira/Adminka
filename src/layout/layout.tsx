import React from "react";
import { Layout, Menu, theme } from "antd";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Cookies } from "typescript-cookie";

const { Content, Sider } = Layout;

const SideBarDatas = [
  {
    key: 1,
    label: <Link to="/app">Category</Link>,
  },
  {
    key: 2,
    label: <Link to="/app/subCategory">Sub Category</Link>,
  },
];

const items = SideBarDatas.map((item) => ({
  key: item.key,
  label: item.label,
}));

export const MainLayout: React.FC = () => {
  const admin = Cookies.get("user");
  if (!admin) return <Navigate to="/" />;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider style={{ height: "100vh", padding: "25px" }}>
        <div style={{ marginBottom: "25px" }}>
          <h1 className="amin_title">Admin</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              height: "680px",
              overflowY: "scroll",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
