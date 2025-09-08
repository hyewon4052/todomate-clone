import styled from "styled-components";
import Body from "./components/Body/Body";
import "./index.css";

function App() {
  return (
    <Main>
      <Body></Body>
    </Main>
  );
}

export default App;

export const Main = styled.div`
  margin: 0 auto;
  width: 60%;
  min-height: 100%;
  max-width: 1200px;
  background: white;
  display: flex;
  flex-direction: column;
`;
