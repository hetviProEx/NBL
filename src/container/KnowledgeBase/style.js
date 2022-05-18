import styled from "styled-components";
import { size } from "App/device";

const BlogStyle = styled.div`
  display: flex;
  .allDiv {
    .headDiv {
      display: flex;
      align-items: center;
      @media ${size["mobile-md-max"]} {
        display: block;
      }
      .boxDiv {
        margin-left: auto;
        @media ${size["mobile-md-max"]} {
          margin-top: 1em;
          margin-left: 0;
          width: 20em;
        }
      }
    }
    .ant-row {
      margin-top: 2em;
      .ant-col .parentCard {
        border-radius: 20px;
        // border: 1px solid #e5e4e2;
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
        margin-bottom: 10px;
        overflow: hidden;
        :hover {
          box-shadow: 0 0 10px #868585 !important;
        }
        .imgAnimation {
          transition: all 0.5s linear;
          height: 15em;
          :hover {
            transform: scale3d(1.1, 1.1, 1.1);
          }
        }
        h3,
        .descDiv {
          line-height: 1.6rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          min-height: 3.2rem;
        }
        .descDiv {
          margin-top: 1em;
        }
        .tags {
          margin-top: 0.5em;
          overflow: hidden;
          display: flex;
        }
        .moreDiv {
          margin-top: 1em;
          text-align: center;
        }
      }
    }
    .viewDiv {
      // border:1px solid;
      margin-top: 1em;
      .ant-image {
        max-width: 50em;
        border-radius: 1em;
        overflow: hidden;
        margin: auto;
        display: flex;
        .ant-image-img {
          transition: all 0.5s linear;
          height: 22em;
          :hover {
            transform: scale3d(1.1, 1.1, 1.1);
          }
        }
      }
      .titleDiv {
        margin-top: 0.5em;
        font-weight: 600;
      }
      .tags {
        margin-top: 0.5em;
        .ant-tag {
          font-size: 23px;
          line-height: 19px;
          border-radius: 6px;
          padding: 5px 7px;
          margin-bottom: 0.5em;
        }
      }
    }
  }
`;

export { BlogStyle };
