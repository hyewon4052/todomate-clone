/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { House, Compass, Bell, User } from "lucide-react";

const Footer = () => {
  return (
    <>
      <nav css={FooterLayout}>
        <div css={IconBox}>
          <House />
          Feed
        </div>
        <div css={IconBox}>
          <Compass color="white" width="50px" />
          Explore
        </div>
        <div css={IconBox}>
          <Bell width="50px" />
          Notifications
        </div>
        <div css={IconBox}>
          <User width="50px" />
          My
        </div>
      </nav>
    </>
  );
};

const FooterLayout = css`
  height: 80px;
  margin-top: 10px;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  display: flex;
  left: 0;
  bottom: 30px;
  flex-direction: row;
  padding: 0 20%;
  width: 60%;
`;

const IconBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 13px;
`;

export default Footer;
