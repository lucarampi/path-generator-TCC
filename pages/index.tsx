import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [points, setPoints] = useState("");
  const [X, setX] = useState(0);
  const [Y, setY] = useState(0);
  const [Z, setZ] = useState(0);
  const [W, setW] = useState(0);
  const [P, setP] = useState(0);
  const [R, setR] = useState(0);
  const [offset, setOffset] = useState(10);
  const [totalLines, setTotalLines] = useState(1);
  const [lineHeight, setLineHeight] = useState(10);
  const [cubePoints, setCubePoints] = useState([[]] as GeneratePointProps[][]);

  const LINES = 4;

  interface PointProps {
    X: number;
    Y: number;
    Z: number;
    W: number;
    P: number;
    R: number;
    order: number;
  }

  type GeneratePointProps = Omit<PointProps, "order">;

  function Point({ order, X, Y, Z, W, P, R }: PointProps) {
    return (
      <div>
        {`P[${order}]{
      GP1:
     UF : 3, UT : 3,		CONFIG : 'N U T, 0, 0, 0',
     X =  ${X}  mm,	Y =   ${Y}  mm,	Z =     ${Z}  mm,
     W =      ${W} deg,	P =     ${P} deg,	R =    ${R} deg
   };`}
      </div>
    );
  }

  function handlePointsChange(
    setFunction: any,
    ev: React.ChangeEvent<HTMLInputElement>
  ) {
    setFunction(Number(ev.target.value));
  }

  useEffect(() => {
    let heightOffset = Z;
    const myArray: GeneratePointProps[][] = Array.from({
      length: totalLines,
    }).map((_, line) => {
      line > 0 && (heightOffset += lineHeight);
      return Array.from({ length: LINES }).map((_, point) => {
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
    });
    setCubePoints(myArray);
  }, [X, Y, Z, W, P, R, offset, totalLines, lineHeight]);

  return (
    <>
      <main>
        <div>
          <label htmlFor="X">X:</label>
          <input
            name="X"
            value={X}
            type="number"
            onChange={(ev) => handlePointsChange(setX, ev)}
          ></input>
          <label htmlFor="Y">Y:</label>
          <input
            name="Y"
            value={Y}
            type="number"
            onChange={(ev) => handlePointsChange(setY, ev)}
          ></input>
          <label htmlFor="Z">Z:</label>
          <input
            name="Z"
            value={Z}
            type="number"
            onChange={(ev) => handlePointsChange(setZ, ev)}
          ></input>
        </div>
        <div>
          <label htmlFor="W">W:</label>
          <input
            name="W"
            value={W}
            type="number"
            onChange={(ev) => handlePointsChange(setW, ev)}
          ></input>
          <label htmlFor="P">P:</label>
          <input
            name="P"
            value={P}
            type="number"
            onChange={(ev) => handlePointsChange(setP, ev)}
          ></input>
          <label htmlFor="R">R:</label>
          <input
            name="R"
            value={R}
            type="number"
            onChange={(ev) => handlePointsChange(setR, ev)}
          ></input>
        </div>

        <div>
          <label htmlFor="size">Tamanho do lado:</label>
          <input
            name="size"
            value={offset}
            type="number"
            onChange={(ev) => handlePointsChange(setOffset, ev)}
          ></input>

          <label htmlFor="totalLines">Quantidade de camadas:</label>
          <input
            name="totalLines"
            value={totalLines}
            type="number"
            onChange={(ev) => handlePointsChange(setTotalLines, ev)}
          ></input>

          <label htmlFor="lineHeight">Altura do cordão de solda:</label>
          <input
            name="lineHeight"
            value={lineHeight}
            type="number"
            onChange={(ev) => handlePointsChange(setLineHeight, ev)}
          ></input>
          <span>Altura final: {totalLines * lineHeight}mm</span>
        </div>
      </main>
      {cubePoints.map((item, index) => {
        <Point order={index} {...item[0]} />;
        console.log(item);
      })}
    </>
  );
};

export default Home;
