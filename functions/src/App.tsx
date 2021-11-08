import { Global } from "@emotion/react";
import React from "react";
import RootRouter from "./route";
import { reset } from "./style/globalStyle";

function App() {
  return (
    <>
      <Global styles={reset} />
      <RootRouter />
    </>
  );
}

export default App;
