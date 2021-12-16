import { usePointToPointConstraint } from "@react-three/cannon";
import { RefObject, useCallback, useEffect } from "react";
import { Object3D } from "three";

const useDragConstraint = (child: RefObject<Object3D>, cursor: RefObject<Object3D>) => {
  const [, , api] = usePointToPointConstraint(cursor, child, {
    pivotA: [0, 0, 0],
    pivotB: [0, 0, 0],
  });
  useEffect(() => void api.disable(), []);
  const onPointerUp = useCallback(() => api.disable(), []);
  const onPointerDown = useCallback((e) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    api.enable();
  }, []);
  return { onPointerUp, onPointerDown };
};

export default useDragConstraint;
