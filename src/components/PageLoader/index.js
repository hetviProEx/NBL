import React from "react";
import { Spin } from "antd";
import { Wrapper } from "./style";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const PageLoader = () => (
  <Wrapper>
    <Spin size="large" indicator={antIcon} />
  </Wrapper>
);

export default PageLoader;
