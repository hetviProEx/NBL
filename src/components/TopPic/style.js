import styled from "styled-components";

const Wrapper = styled.div`
  .hero.parallax {
    background-attachment: fixed;
    background-image: url("https://bulkit.cssninja.io/assets/img/demo/agency/agency2.jpg");
    background-position: 50% 0;
  }
  .parallax-overlay {
    background-color: rgb(0, 0, 0);
    opacity: 0.3;
  }
  .conpic {
    background-image: url("https://bulkit.cssninja.io/assets/img/demo/startup/contact.jpg") !important;
  }
`;

export { Wrapper };
