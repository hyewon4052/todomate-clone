/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Calendar1, Send, CircleEllipsis } from "lucide-react";
import Logo from "/assets/images/feedLogo.svg";

const Header = () => {
  return (
    <>
      <div css={HeaderLayout}>
        <img src={Logo} width="40px" />
        <div>
          <Calendar1 color="white" width="50px" />
          <Send width="50px" />
          <CircleEllipsis width="50px" />
        </div>
      </div>
    </>
  );
};

const HeaderLayout = css`
  margin-top: 10px;
  min-height: 100%;
  max-width: 1200px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export default Header;
