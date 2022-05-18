import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Card, Image, Spin, Modal } from "antd";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { ProductStyle } from "./style";
import { ProductConst } from "./constant";
import { configVar } from "modules/config";
import { getAuthRole } from "modules/helper";
import { RemoveConst } from "App/AppConstant";
import { Menu, Header, Popover } from "components/Form";
import { view, edit, packag, deleteSvg } from "components/Images";
import { getProduct, deleteProduct } from "redux/product/action";
const { confirm } = Modal;
var role = getAuthRole();

class products extends Component {
  constructor(props) {
    super(props);
    this.state = { role: "" };
  }
  async componentDidMount() {
    try {
      role = role ? role : getAuthRole();
      role && this.setState({ role: role });
      await this.props.getProduct();
    } catch (error) {
      console.log(error);
    }
  }
  deleteProduct = async (val) => {
    try {
      confirm({
        title: RemoveConst.header + ProductConst.product,
        icon: <QuestionCircleOutlined />,
        content:
          RemoveConst.deleteMessage +
          ProductConst.product.toLowerCase() +
          RemoveConst.que,
        okText: RemoveConst.yes,
        okType: "danger",
        cancelText: RemoveConst.no,
        getContainer: () => document.getElementById("products_div"),
        onOk: () => {
          this.deleteCol(val);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  deleteCol = async (id) => await this.props.deleteProduct(id);
  pushToUrl = (url, name, id) => {
    try {
      name &&
        id &&
        this.props.history.push(
          url + name?.split(" ")[0] + "/" + window.btoa(id)
        );
    } catch (error) {
      console.log(error);
    }
  };
  CardUI = () => {
    try {
      const { products } = this.props;
      const { role } = this.state;
      // let length = products?.length > 6 ? Math.ceil(products?.length / 6) : 0;
      return products?.map((a, i) => (
        <Col xs={24} sm={12} md={24} lg={12} xl={8} key={i}>
          <Card className="card anime">
            <div
              className="imgBx pointer"
              onClick={() =>
                this.setRigts("productsview") &&
                this.pushToUrl("/productDetail/", a.productname, a.productId)
              }
            >
              <Image
                src={configVar.BASE_URL.slice("/", -1) + a.productLogo}
                preview={false}
                className="img-div"
                height={41}
              />
            </div>
            <div className="contant_div">
              <div className="contName">
                <h2>{a.productname}</h2>
                <p>{a.productTitle}</p>
              </div>
              {role !== "partner" ? (
                <div className="actionDiv">
                  {this.setRigts("productsview") && (
                    <Popover content={"View"} trigger="hover">
                      <div
                        className="acLogDiv pointer"
                        onClick={() =>
                          this.pushToUrl(
                            "/productDetail/",
                            a.productname,
                            a.productId
                          )
                        }
                      >
                        <Image src={view} preview={false} width={15} />
                      </div>
                    </Popover>
                  )}
                  {this.setRigts("productsedit") && (
                    <>
                      <Popover content={"Edit"} trigger="hover">
                        <div
                          className="acLogDiv pointer"
                          onClick={() =>
                            this.props.history.push(
                              "product/edit/" + window.btoa(a.productId)
                            )
                          }
                        >
                          <Image src={edit} preview={false} width={15} />
                        </div>
                      </Popover>
                      <Popover content={"Package List"} trigger="hover">
                        <div
                          className="acLogDiv pointer"
                          onClick={() =>
                            this.pushToUrl(
                              "/package-list/",
                              a.productname,
                              a.productId
                            )
                          }
                        >
                          <Image src={packag} preview={false} width={20} />
                        </div>
                      </Popover>
                    </>
                  )}
                  {this.setRigts("productsdelete") && (
                    <Popover content={"Delete Product"} trigger="hover">
                      <div
                        className="acLogDiv pointer"
                        onClick={() => this.deleteProduct(a.productId)}
                      >
                        <Image src={deleteSvg} preview={false} width={15} />
                      </div>
                    </Popover>
                  )}
                </div>
              ) : (
                <div
                  className="viewMore pointer"
                  onClick={() =>
                    this.pushToUrl(
                      "/productDetail/",
                      a.productname,
                      a.productId
                    )
                  }
                >
                  {ProductConst.viewMore}
                </div>
              )}
            </div>
          </Card>
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  setRigts = (a) => {
    try {
      if (role === "user") {
        let rights = window.atob(sessionStorage.rights);
        return rights.match(a);
      } else return true;
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { loading } = this.props;
    const { role } = this.state;
    return (
      <Spin spinning={loading} size="large">
        <ProductStyle id="products_div">
          <Menu />
          <div className="container">
            <Header title={"Product"} />
            <div className="allDiv">
              <div className="headDiv">
                <h2 className="hrob">{ProductConst.nblPro}</h2>
                {role !== "partner" && this.setRigts("productsadd") && (
                  <div
                    className="addButton pointer"
                    onClick={() => this.props.history.push("/product/new")}
                  >
                    <PlusOutlined />
                  </div>
                )}
              </div>
              <div className="products_div">
                <Row gutter={25}>{this.CardUI()}</Row>
              </div>
            </div>
          </div>
        </ProductStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.product.loading,
  products: state.product.products,
});
const mapDispatchToProps = (dispatch) => ({
  getProduct: (payload) => dispatch(getProduct(payload)),
  deleteProduct: (payload) => dispatch(deleteProduct(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(products)
);
