import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Point, { PointProps } from "../components/Point";

const Home: NextPage = () => {
  const [points, setPoints] = useState("");
  const [X, setX] = useState(0);
  const [Y, setY] = useState(0);
  const [Z, setZ] = useState(0);
  const [W, setW] = useState(0);
  const [P, setP] = useState(0);
  const [R, setR] = useState(0);
  const [offset, setOffset] = useState(100);
  const [totalLines, setTotalLines] = useState(1);
  const [lineHeight, setLineHeight] = useState(2);
  const [torchDO, setTorchDO] = useState(10);
  const [waitTime, setWaitTime] = useState(2);

  const [cubePoints, setCubePoints] = useState([] as GeneratePointProps[]);

  const LINES = 4;

  type GeneratePointProps = Omit<PointProps, "order">;

  function handlePointsChange(
    setFunction: any,
    ev: React.ChangeEvent<HTMLInputElement>
  ) {
    setFunction(Number(ev.target.value));
  }

  useEffect(() => {
    function generatePoints(): GeneratePointProps[] {
      let heightOffset = Z;
      const myArray = [] as GeneratePointProps[];
      Array.from({
        length: totalLines,
      }).map((_, line) => {
        line > 0 && (heightOffset += lineHeight);

        const point = Array.from({ length: LINES }).map((_, point) => {
          if (point == 0)
            return { X: X, Y: Y, Z: heightOffset, W: W, P: P, R: R };
          if (point == 1)
            return { X: X + offset, Y: Y, Z: heightOffset, W: W, P: P, R: R };
          if (point == 2)
            return {
              X: X + offset,
              Y: Y + offset,
              Z: heightOffset,
              W: W,
              P: P,
              R: R,
            };
          if (point == 3)
            return { X: X, Y: Y + offset, Z: heightOffset, W: W, P: P, R: R };

          return {} as GeneratePointProps;
        });

        point.forEach((item) => {
          myArray.push(item);
        });
      });
      return myArray;
    }

    const newPoints = generatePoints();
    setCubePoints(newPoints);
  }, [X, Y, Z, W, P, R, offset, totalLines, lineHeight]);

  return (
    <>
      <div className="wrapper">
        <main className="container w-full mt-5 flex flex-row flex-wrap gap-7">
          <section>
            <label htmlFor="X">
              <span>X: </span>
              <input
                name="X"
                value={X}
                type="number"
                onChange={(ev) => handlePointsChange(setX, ev)}
              ></input>
              <span></span>
            </label>
            <label htmlFor="Y">
              <span>Y: </span>
              <input
                name="Y"
                value={Y}
                type="number"
                onChange={(ev) => handlePointsChange(setY, ev)}
              ></input>
              <span></span>
            </label>
            <label htmlFor="Z">
              <span>Z: </span>
              <input
                name="Z"
                value={Z}
                type="number"
                onChange={(ev) => handlePointsChange(setZ, ev)}
              ></input>
              <span></span>
            </label>

            <label htmlFor="W">
              <span>W: </span>
              <input
                name="W"
                value={W}
                type="number"
                onChange={(ev) => handlePointsChange(setW, ev)}
              ></input>
              <span></span>
            </label>
            <label htmlFor="P">
              <span>P: </span>
              <input
                name="P"
                value={P}
                type="number"
                onChange={(ev) => handlePointsChange(setP, ev)}
              ></input>
              <span></span>
            </label>
            <label htmlFor="R">
              <span>R: </span>
              <input
                name="R"
                value={R}
                type="number"
                onChange={(ev) => handlePointsChange(setR, ev)}
              ></input>
              <span></span>
            </label>

            <label htmlFor="offset">
              <span>Comprimento: </span>
              <input
                name="offset"
                value={offset}
                type="number"
                onChange={(ev) => handlePointsChange(setOffset, ev)}
              ></input>
            </label>

            <label htmlFor="lineHeight">
              <span>Altura do cordão: </span>
              <input
                name="lineHeight"
                value={lineHeight}
                type="number"
                onChange={(ev) => handlePointsChange(setLineHeight, ev)}
              ></input>
              <span></span>
            </label>

            <label htmlFor="totalLines">
              <span>Quantidade de camadas: </span>
              <input
                name="totalLines"
                value={totalLines}
                type="number"
                onChange={(ev) => handlePointsChange(setTotalLines, ev)}
              ></input>
            </label>

            <span>Altura final: {totalLines * lineHeight}mm</span>
          </section>

          <article>
            <section>
              {cubePoints.map((item, index) => {
                return <Point key={index} order={++index} {...item} />;
              })}
            </section>
            {/* <section>
          <h1>Programa</h1>
          <label htmlFor="torchDO">Saída digital da tocha: </label>
          <input
            name="torchDO"
            value={torchDO}
            type="number"
            onChange={(ev) => handlePointsChange(setTorchDO, ev)}
          ></input>

          <label htmlFor="waitTime">Wait: </label>
          <input
            name="waitTime"
            value={waitTime}
            type="number"
            onChange={(ev) => handlePointsChange(setWaitTime, ev)}
          ></input>
        </section> */}
          </article>
        </main>
      </div>
    </>
  );
};

export default Home;
