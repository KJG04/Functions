import { FC, useCallback, useMemo, useState } from "react";
import uniqueId from "../../constance/UniqueId";
import {
  CurrentNode,
  Dot,
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

  const getDotById = useCallback(
    (id: string): Dot | null => {
      let dot: Dot | null = null;

      gates.forEach((value) => {
        const { input1, input2, output } = value;

        [input1, input2, output].forEach((value) => {
          if (value && value.id === id) {
            dot = value;
          }
        });
      });

      return dot;
    },
    [gates]
  );

  const addNode = useCallback(
    (startDotId: string, endDotId: string) => {
      const start = getDotById(startDotId);
      const end = getDotById(endDotId);

      if (!start || !end) {
        return;
      }

      setNodes([...nodes, { id: uniqueId(), isActive: false, dot1: start, dot2: end }]);
    },
    [getDotById, nodes]
  );

  const setNodeIsActive = useCallback(
    (nodeId: string, isActive: boolean) => {
      const copyNodes = [...nodes];
      copyNodes[nodes.findIndex((value) => value.id === nodeId)].isActive = isActive;

      setNodes([...copyNodes]);
    },
    [nodes]
  );

  const addGate = useCallback(
    (type: string) => {
      setGates([...gates, { id: uniqueId(), position: [0, 0], type }]);
    },
    [gates]
  );

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
      addGate,
    }),
    [
      addGate,
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
