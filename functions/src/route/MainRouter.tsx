import { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { MainContainer, MinesweeperContainer, TestContainer } from "../container";

const MainRouter: FC = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={MainContainer} exact path="/" />
        <Route component={MinesweeperContainer} path="/minesweeper" />
        <Route component={TestContainer} path="/test" />
      </Switch>
    </>
  );
};

export default MainRouter;
