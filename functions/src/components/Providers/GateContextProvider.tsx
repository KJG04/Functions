import { FC, useCallback, useMemo, useState } from "react";
import { Dot, Gate, GateContext, GateContextType, Node, Point } from "../../context/GateContext";

const GateContextProvider: FC = ({ children }) => {
  const [gates, setGates] = useState<Gate[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [currentNode, setCurrentNode] = useState<Node | null>(null);

  const startNode = useCallback((dot: Dot) => {}, []);
  const endNode = useCallback((position: Point) => {}, []);
  const addNode = useCallback((startDotId: string, endDotId: string) => {}, []);
  const setNodeIsActive = useCallback((nodeId: string, isActive: boolean) => {}, []);

  const value = useMemo<GateContextType>(
    () => ({ gates, nodes, currentNode, startNode, endNode, addNode, setNodeIsActive }),
    [addNode, currentNode, endNode, gates, nodes, setNodeIsActive, startNode]
  );
  return <GateContext.Provider value={value}>{children}</GateContext.Provider>;
};

export default GateContextProvider;
