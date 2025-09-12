/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Body from "./components/Body";
import Footer from "./components/Footer";

import "./index.css";

function App() {
  return (
    <div css={mainStyle}>
      <Body />
      <Footer />
    </div>
  );
}

const mainStyle = css`
  margin: 0 auto;
  width: 50%;
  min-height: 100%;
  max-width: 1200px;
  background: black;
  display: flex;
  flex-direction: column;
`;

export default App;
