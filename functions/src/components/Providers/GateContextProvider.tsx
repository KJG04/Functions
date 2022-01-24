import { FC, useCallback, useMemo, useState } from "react";
import {
  CurrentNode,
  Gate,
  GateContext,
  GateContextType,
  Node,
  Point,
} from "../../context/GateContext";

const GateContextProvider: FC = ({ children }) => {
  const [gates, setGates] = useState<Gate[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [currentNode, setCurrentNode] = useState<CurrentNode | null>(null);

  const startCurrentNode = useCallback((position: Point) => {
    setCurrentNode({ start: position, end: position });
  }, []);

  const endCurrentNode = useCallback(
    (position: Point) => {
      if (!currentNode) {
        return;
      }

      setCurrentNode({ ...currentNode, end: position });
    },
    [currentNode]
  );

  const removeCurrentNode = useCallback(() => {
    setCurrentNode(null);
  }, []);

  const addNode = useCallback((startDotId: string, endDotId: string) => {}, []);
  const setNodeIsActive = useCallback((nodeId: string, isActive: boolean) => {}, []);

  const value = useMemo<GateContextType>(
    () => ({
      gates,
      nodes,
      currentNode,
      startCurrentNode,
      endCurrentNode,
      removeCurrentNode,
      addNode,
      setNodeIsActive,
    }),
    [
      addNode,
      currentNode,
      endCurrentNode,
      gates,
      nodes,
      removeCurrentNode,
      setNodeIsActive,
      startCurrentNode,
    ]
  );
  return <GateContext.Provider value={value}>{children}</GateContext.Provider>;
};

export default GateContextProvider;
