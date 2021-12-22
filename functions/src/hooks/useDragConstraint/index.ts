import { PublicApi, usePointToPointConstraint } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { RefObject, useCallback, useEffect, useRef } from "react";
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
  const isDrag = useRef(false);

  useEffect(() => void api.disable(), []);

  useFrame((e) => {
    // if (isDrag.current) {
    //   const t = e.clock.getElapsedTime();
    //   const sin = Math.sin(t + Math.PI) * 10;
    //   const cos = Math.cos(t) * 10;
    //   // childApi.rotation.set(sin, cos, cos);
    // }
  });

  const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  };

  const onPointerUp = useCallback(() => {
    isDrag.current = false;
    api.disable();
    childApi.angularVelocity.set(getRandomInt(-5, 5), getRandomInt(-5, 5), getRandomInt(-5, 5));
  }, [api, childApi.angularVelocity]);

  const onPointerDown = useCallback(
    (e) => {
      isDrag.current = true;
      e.stopPropagation();
      e.target.setPointerCapture(e.pointerId);
      api.enable();
    },
    [api]
  );

  return { onPointerUp, onPointerDown };
};

export default useDragConstraint;
