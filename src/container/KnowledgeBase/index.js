import React, { Component } from "react";
import { Row, Col, Tag, Spin, Image } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SearchOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import { BlogStyle } from "./style";
import { KnowConst } from "./constant";
import { configVar } from "modules/config";
import { knowledgeList } from "redux/cms/action";
import { ImageCard, Menu, Header, Button, Input } from "components/Form";
// import { defaultImage } from "components/Images";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onView: false,
      viewData: {},
      search: "",
      paramet: {
        parameter: "",
        pageSize: "2000",
        page: "1",
        sortColumn: "knowledgebaseid desc",
        search: "",
      },
    };
  }
  async componentDidMount() {
    try {
      const { paramet } = this.state;
      await this.props.knowledgeList(paramet);
    } catch (error) {
      console.log(error);
    }
  }
  clickMore = async (id) => {
    try {
      const { onView } = this.state;
      const { knowList } = this.props;
      let vdata = knowList.find((x) => x.knowId === id);
      this.setState({ onView: !onView, viewData: vdata });
    } catch (error) {
      console.log(error);
    }
  };
  searchChange = (e) => this.setState({ search: e.target.value.trim() });
  searchText = () => {
    try {
      const { knowList } = this.props;
      const { search } = this.state;
      if (search && search !== "") {
        let searchData = [];
        let display = [];
        knowList?.forEach((a) => {
          display.push(a.faqTitle, a.categoryName, a.tags, a.faqDescription);
          let array = [];
          display?.forEach((e) => {
            if (e && e !== null && e.toString().length > 0) array.push(e);
          });
          let matches = array.filter((s) =>
            s.toString().toLowerCase().includes(search.toString().toLowerCase())
          );
          display = [];
          if (matches && matches.length > 0) searchData.push(a);
        });
        return searchData;
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { knowList, loading } = this.props;
    const { onView, viewData, search } = this.state;
    let display = search !== "" ? this.searchText() : knowList;
    return (
      <Spin spinning={loading} size="large">
        <BlogStyle>
          <Menu />
          <div className="container">
            <Header title={"Blog"} />
            <div className="allDiv">
              <div className="headDiv">
                <h2 className="hrob">{KnowConst.knoBase}</h2>
                {!onView ? (
                  <div className="boxDiv">
                    <Input
                      placeholder={KnowConst.search}
                      suffix={<SearchOutlined />}
                      onChange={this.searchChange}
                    />
                  </div>
                ) : (
                  <div
                    className="addButton pointer"
                    onClick={() => this.clickMore()}
                  >
                    <ArrowLeftOutlined />
                  </div>
                )}
              </div>
              {!onView ? (
                <Row gutter={24}>
                  {display?.map(
                    (e, i) =>
                      e.ispublished === 0 && (
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                          <ImageCard
                            hoverable={true}
                            className="parentCard"
                            // cover={
                            //   <img
                            //     alt="blg"
                            //     src={e.uploadImage!==""?configVar.BASE_URL+e.uploadImage:defaultImage}
                            //     className="imgAnimation"
                            //   />
                            // }
                          >
                            <h3>{e.faqTitle}</h3>
                            <div className="tags">
                              {e.tags?.split(",")?.map((a, i) => (
                                <Tag id={i} color="blue">
                                  {a}
                                </Tag>
                              ))}
                            </div>
                            <div
                              className="descDiv"
                              dangerouslySetInnerHTML={{
                                __html: e.faqDescription,
                              }}
                            />
                            <div className="moreDiv">
                              <Button onClick={() => this.clickMore(e.knowId)}>
                                {KnowConst.readMore}
                              </Button>
                            </div>
                          </ImageCard>
                        </Col>
                      )
                  )}
                </Row>
              ) : (
                <div className="viewDiv">
                  {viewData.uploadImage !== "" && (
                    <Image
                      preview={false}
                      src={configVar.BASE_URL + viewData.uploadImage}
                    />
                  )}
                  <h1 className="hrob titleDiv">{viewData.faqTitle}</h1>
                  <h2 className="hrob titleDiv">{viewData.categoryName}</h2>
                  <div className="tags">
                    {viewData.tags?.split(",")?.map((a, i) => (
                      <Tag id={i} color="blue">
                        {a}
                      </Tag>
                    ))}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: viewData.faqDescription,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </BlogStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.cms.loading,
  knowList: state.cms.knowledgeList,
});
const mapDispatchToProps = (dispatch) => ({
  knowledgeList: (payload) => dispatch(knowledgeList(payload)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));
