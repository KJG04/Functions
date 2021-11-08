import { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { MinesweeperContainer, TestContainer } from "../container";

const MainRouter: FC = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={MinesweeperContainer} path="/minesweeper" />
        <Route component={TestContainer} path="/test" />
      </Switch>
    </>
  );
};

export default MainRouter;
