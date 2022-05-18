import styled from "styled-components";

const ProfileStyle = styled.div`
  display: flex;
  .allDiv {
    .avatar {
      border-radius: 50%;
      display: inline-block;
    }
    .header {
      display: inline;
      margin-left: 1rem;
    }
    .ant-tabs {
      background-color: #fff;
      padding: 1em;
      margin-top: 1em;
      border-radius: 1em;
      min-height: 50vh;
    }
  }
`;

export { ProfileStyle };
