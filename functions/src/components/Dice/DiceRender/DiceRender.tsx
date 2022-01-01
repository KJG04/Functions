import { Triplet, useBox, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import React from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Euler, Object3D, Quaternion, Vector3 } from "three";
import useDragConstraint from "../../../hooks/useDragConstraint";
import { State } from "../../../module/Types";
import { color } from "../../Minesweeper";

interface PropsType {
  isRollingState: State<boolean>;
  addDiceValue: (value: number) => void;
}

const DiceRender = forwardRef<{ resetDicePosition: () => void }, PropsType>(
  ({ isRollingState, addDiceValue }, fref) => {
    const boxSize: Triplet = [1, 1, 1];
    const sizeOffset = 2;
    const circleArgs: [number, number] = [1 * 0.1, 100];

    const [cursorRef, cursorApi] = useSphere(() => ({
      type: "Static",
      args: [0.5],
      position: [0, 0, 10000],
      collisionFilterMask: 100,
    }));

    const [ref, api] = useBox(() => ({
      mass: 1,
      args: boxSize.map((value) => value * sizeOffset) as Triplet,
      linearDamping: 0.9,
      angulardamping: 1.99,
      position: [0, 0, 0],
    }));

    const angularVelocity = useRef<Triplet>([1, 0, 0]);
    const velocity = useRef<Triplet>([1, 0, 0]);
    const rotation = useRef<Quaternion>(new Quaternion(0, 0, 0, 0));
    const falseCount = useRef<number>(0);
    const isDrag = useRef<boolean>(false);
    const sides = useRef<React.RefObject<Object3D<Event>>[]>(
      Array(6)
        .fill(0)
        .map(() => React.createRef())
    );

    const bind = useDragConstraint(ref, api, cursorRef, isDrag);

    const [isRoll, setIsRoll] = isRollingState;

    const isRolling = useCallback((): boolean => {
      const v = velocity.current.map((v) => Math.ceil(v * 100) / 100);
      const a = angularVelocity.current.map((v) => Math.ceil(v * 100) / 100);

      return v.some((value) => Math.abs(value) >= 0.1) || a.some((value) => Math.abs(value) >= 0.1);
    }, []);

    const checkDiceIsRolling = useCallback(() => {
      //멈춰있는지 확인한다.
      const presentState = isRolling();
      const prevState = isRoll;

      if (presentState !== prevState) {
        //현재 상태와 이전 상태가 다를때
        let isChange = false;

        if (!presentState && !isDrag.current) {
          //현재 상태가 false이면 falseCount의 값을 올린다.
          const maxFrame = 40;
          if (falseCount.current > maxFrame) {
            //만약 falseCount 값이 count보다 크면 그때 isRoll 값을 false로 하고 falseCount는 0으로 한다.
            setIsRoll(false);
            isChange = true;
            falseCount.current = 0;
          } else {
            falseCount.current = falseCount.current + 1;
          }
        }

        if (!isChange) {
          setIsRoll(true);
        }
      } else {
        falseCount.current = 0;
      }
    }, [isRoll, isRolling, setIsRoll]);

    useFrame((e) => {
      //커서 위치를 매 프레임 설정한다.
      const x = e.mouse.x * e.viewport.width;
      const y = (e.mouse.y * e.viewport.height) / 1.9 + -x / 3.5;

      cursorApi.position.set(x / 1.4, y, 0);

      checkDiceIsRolling();
    });

    const calcDiceValue = useCallback(() => {
      if (!isRoll) {
        const { x, y, z } = new Euler().setFromQuaternion(rotation.current);
        const rot = [x, y, z];

        const parentRotation = rot.map((v) => Math.round(v * (180 / Math.PI)));

        const result = sides.current.map((v) => {
          const { x, y, z } = new Euler().setFromQuaternion(v.current?.quaternion as Quaternion);

          const rot = [x, y, z];
          const childRotation = rot.map((v) => Math.round(v * (180 / Math.PI)));

          return parentRotation.map((v, index) => childRotation[index] + v);
        });

        //z값을 180으로 나머지 연산했을때 0이 아니고 90으로 나머지 연산했을 때 0이면 주사위의 값은 2 또는 5이다.
        const isTwoOrFive = result[0][2] % 180 !== 0 && result[0][2] % 90 === 0;

        if (isTwoOrFive) {
          //값이 2 또는 5일때는 x값과 z값을 고려해야 한다.
          //x값은 0또는 180이고 z값은 -90또는 90이다.
          const [x, , z] = result[0];

          const sign = x !== 0 ? -1 : 1;
          const valueMap = new Map().set(true, 5).set(false, 2);
          const value = valueMap.get(z * sign === -90);
          console.log(`dice is ${value}`);
        } else {
          const isOneOrSix = result[0][2] % 180 !== 0 && result[0][2] % 90 !== 0;

          if (isOneOrSix) {
            //값이 1또는 6일때는 x값만 고려해도 된다.
            //x 값이 -90인 면이 윗면이 된다.
            const confirmedDots = [0, 5];

            confirmedDots.forEach((v) => {
              const x = result[v][0] > 180 ? result[v][0] - 360 : result[v][0];
              if (x === -90) {
                console.log(`dice is ${v + 1}`);
              }
            });
          } else {
            //값이 3또는 4일때는 x값과 z값의 부호를 고려해야한다.
            //x 값에 z의 부호를 곱해 그 값이 -90인 면이 윗면이 된다.
            const confirmedDots = [2, 3];

            const xs = confirmedDots
              .map((v) => result[v].map((e) => (e > 180 ? e - 360 : e)))
              .map((v) => {
                const sign = v[2] === 0 ? 1 : -1;

                return v[0] * sign;
              });

            confirmedDots.forEach((v, index) => {
              if (xs[index] === -90) {
                console.log(`dice is ${v + 1}`);
              }
            });
          }
        }
      }
    }, [isRoll]);

    useEffect(() => {
      calcDiceValue();
    }, [isRoll]);

    useEffect(() => {
      //각속도값과 이동속도값을 가지기 위해 subscribe를 통해 가져온다.
      const unsubscribeAngularVelocity = api.angularVelocity.subscribe((v) => {
        angularVelocity.current = v;
      });
      const unsubscribeVelocity = api.velocity.subscribe((v) => {
        velocity.current = v;
      });

      //각도를 구하기위해 subscribe를 한다.
      const unsubscribeRotation = api.quaternion.subscribe((v) => {
        rotation.current = new Quaternion(...v);
      });

      return () => {
        //dice가 없어지면 속도값을 구할 필요가 없기 때문에 unsubscribe한다.
        unsubscribeAngularVelocity();
        unsubscribeVelocity();

        //dice가 없어지면 각을 구할 필요가 없기 때문에 unsubscribe한다.
        unsubscribeRotation();
      };
    }, []);

    const resetDicePosition = useCallback(() => {
      api.position.set(0, 0, 0);
    }, [api]);

    useImperativeHandle(fref, () => ({
      resetDicePosition,
    }));

    return (
      <>
        <group ref={ref} scale={new Vector3(sizeOffset, sizeOffset, sizeOffset)} {...bind}>
          <mesh castShadow receiveShadow>
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color={color.white} />
          </mesh>

          {/* 1 */}
          <group position={[0, 0, 0.51]} ref={sides.current[0]}>
            <mesh>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
          </group>

          {/* 2 */}
          <group position={[0.51, 0, 0]} rotation={[0, Math.PI / 2, 0]} ref={sides.current[1]}>
            <mesh position={[-0.3, -0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
            <mesh position={[0.3, 0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
          </group>

          {/* 3 */}
          <group position={[0, 0.51, 0]} rotation={[Math.PI / -2, 0, 0]} ref={sides.current[2]}>
            <mesh position={[-0.3, -0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
            <mesh position={[0.3, 0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
          </group>

          {/* 4 */}
          <group position={[0, -0.51, 0]} rotation={[Math.PI / 2, 0, 0]} ref={sides.current[3]}>
            <mesh position={[-0.3, -0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
            <mesh position={[-0.3, 0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
            <mesh position={[0.3, -0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
            <mesh position={[0.3, 0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
          </group>

          {/* 5 */}
          <group position={[-0.51, 0, 0]} rotation={[0, Math.PI / -2, 0]} ref={sides.current[4]}>
            <mesh>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
            <mesh position={[-0.3, -0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
            <mesh position={[-0.3, 0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
            <mesh position={[0.3, -0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
            <mesh position={[0.3, 0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
          </group>

          {/* 6 */}
          <group position={[0, 0, -0.51]} rotation={[Math.PI, 0, 0]} ref={sides.current[5]}>
            <mesh position={[-0.3, -0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
            <mesh position={[-0.3, 0, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
            <mesh position={[-0.3, 0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
            <mesh position={[0.3, -0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
            <mesh position={[0.3, 0, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
            <mesh position={[0.3, 0.3, 0]}>
              <circleBufferGeometry attach="geometry" args={circleArgs} />
              <meshLambertMaterial attach="material" color={color.black} />
            </mesh>
          </group>
        </group>
        <mesh ref={cursorRef} />
      </>
    );
  }
);

export default DiceRender;
