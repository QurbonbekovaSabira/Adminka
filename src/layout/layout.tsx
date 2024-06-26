import React from "react";
import { Layout, Menu, theme } from "antd";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Cookies } from "typescript-cookie";
import { useLocation } from "react-router-dom";
import {
  AppstoreAddOutlined,
  GlobalOutlined,
  // PieChartOutlined,
  AppstoreOutlined,
  ShopOutlined,
  SwitcherOutlined,
  BorderOutlined,
} from "@ant-design/icons";

const { Content, Sider } = Layout;

const SideBarDatas = [
  {
    key: "/app",
    label: (
      <Link to="/app">
        <h4>
          <AppstoreOutlined /> Category List
        </h4>
      </Link>
    ),
  },
  {
    key: "/app/subCategory",
    label: (
      <Link to="/app/subCategory">
        <h4>
          <AppstoreAddOutlined /> Sub Category List
        </h4>
      </Link>
    ),
  },
  {
    key: "/app/brand",
    label: (
      <Link to={"/app/brand"}>
        <h4>
          <GlobalOutlined /> Brand List
        </h4>
      </Link>
    ),
  },
  // {
  //   key: "/app/atribute",
  //   label: (
  //     <Link to={"/app/atribute"}>
  //       <h4>
  //         <PieChartOutlined /> Atribute
  //       </h4>
  //     </Link>
  //   ),
  // },
  {
    key: "/app/banners",
    label: (
      <Link to={"/app/banners"}>
        <h4>
          <BorderOutlined /> Banners List
        </h4>
      </Link>
    ),
  },
  {
    key: "/app/product",
    label: (
      <Link to={"/app/product"}>
        <h4>
          <ShopOutlined /> Product List
        </h4>
      </Link>
    ),
  },
  {
    key: "/app/product-variant",
    label: (
      <Link to={"/app/product-variant"}>
        <h4>
          <SwitcherOutlined /> Product variants
        </h4>
      </Link>
    ),
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
  const location = useLocation();
  const [active, setActive] = React.useState(
    () => localStorage.getItem("activeMenuItem") || location.pathname
  );

  React.useEffect(() => {
    if (location.pathname == "/app/create-category") {
      setActive("/app");
    }
    if (location.pathname === "/app/create-sub-category") {
      setActive("/app/subCategory");
    }
    if (location.pathname === "/app/create-brand") {
      setActive("/app/brand");
    } else {
      setActive(location.pathname);
      localStorage.setItem("activeMenuItem", location.pathname);
    }
  }, [location.pathname]);

  return (
    <Layout>
      <Sider style={{ height: "100vh", paddingTop: "25px", zIndex: "10" }}>
        <div style={{ marginBottom: "25px" }}>
          <h1 className="amin_title">Admin</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[active]}
          items={items}
        />
      </Sider>
      <Layout style={{ zIndex: "100", position: "relative" }}>
        <Content style={{ margin: "24px 24px 0" }}>
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
