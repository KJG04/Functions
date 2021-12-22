import { PublicApi, usePointToPointConstraint } from "@react-three/cannon";
import { RefObject, useCallback, useEffect } from "react";
import { Object3D } from "three";

const useDragConstraint = (
  child: RefObject<Object3D>,
  childApi: PublicApi,
  cursor: RefObject<Object3D>
) => {
  const [, , api] = usePointToPointConstraint(cursor, child, {
    pivotA: [0, 0, 0],
    pivotB: [0, 0, 0],
  });

  useEffect(() => void api.disable(), [api]);

  const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  };

  const onPointerUp = useCallback(() => {
    api.disable();
    childApi.angularVelocity.set(getRandomInt(-5, 5), getRandomInt(-5, 5), getRandomInt(-5, 5));
  }, [api]);

  const onPointerDown = useCallback(
    (e) => {
      e.stopPropagation();
      e.target.setPointerCapture(e.pointerId);
      api.enable();
    },
    [api]
  );

  return { onPointerUp, onPointerDown };
};

export default useDragConstraint;
