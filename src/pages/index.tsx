import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { json } from "stream/consumers";
import Input from "../components/Input";
import Point, { PointProps } from "../components/Point";

const Home: NextPage = () => {
  const [pointsArray, setPointsArray] = useState<Array<GeneratePointProps[]>>(
    []
  );
  const [programName, setProgramName] = useState("PROGRAM1");
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
  const [userToolCO2, setUserToolCO2] = useState(1);
  const [userToolTorch, setUserToolTorch] = useState(1);
  const [isCO2, setIsCO2] = useState(false);
  const [userFrame, setUserFrame] = useState(1);
  const [waitTime, setWaitTime] = useState(2);
  const [speedMMPerSec, setSpeedPerMM] = useState(150);

  const [cubePoints, setCubePoints] = useState([] as GeneratePointProps[]);

  const LINES = 4;
  const APPROACH_STEPS = 2;
  const APPROACH_OFFSET = 50;

  type GeneratePointProps = PointProps;

  const programSchema = [
    `/PROG  `,
    `/ATTR`,
    `OWNER		= MNEDITOR`,
    `COMMENT		= ""`,
    `PROG_SIZE	= `,
    `CREATE		= DATE 22-06-06  TIME 15:30:00`,
    `MODIFIED	= DATE 22-06-06  TIME 15:35:00`,
    `FILE_NAME	= `,
    `VERSION		= 0`,
    `LINE_COUNT	= `,
    `MEMORY_SIZE	= `,
    `PROTECT		= READ_WRITE`,
    `TCD:  STACK_SIZE	= 0,
TASK_PRIORITY	= 50,
TIME_SLICE	= 0,
BUSY_LAMP_OFF	= 0,
ABORT_REQUEST	= 0,
PAUSE_REQUEST	= 0`,
    `DEFAULT_GROUP	= 1,*,*,*,*`,
    `CONTROL_CODE	= 00000000 00000000;`,
    `/APPL`,
    `ARC Welding Equipment : 1,*,*,*,*;`,
    `/MN`,
  ];

  function handlePointsChange(
    setFunction: any,
    ev: React.ChangeEvent<HTMLInputElement>
  ) {
    setFunction(Number(ev.target.value));
  }

  function printLines(isCO2: boolean) {
    let lineCounter = 1;
    const lines = pointsArray.map((currLine) => {
      return currLine.map((item, index) => {
        if (index == 0) {
          return (
            <>
              <p key={lineCounter++}>
                {lineCounter}: {`P[${item.order}] ${speedMMPerSec}mm/sec FINE`}{" "}
                ;
              </p>
              <p key={lineCounter++}>
                {lineCounter}: {`DO[${torchDO}]=ON`} ;
              </p>
              <p key={lineCounter++}>
                {lineCounter}: {`WAIT ${waitTime}.00(sec)`} ;
              </p>
            </>
          );
        }
        if (index == 5)
          return (
            <>
              <p key={lineCounter++}>
                {lineCounter}:{" "}
                {`P[${item.order - 4}] ${speedMMPerSec}mm/sec FINE`} ;
              </p>
              <p key={lineCounter++}>
                {lineCounter}: {`DO[${torchDO}]=OFF`} ;
              </p>
              <p key={lineCounter++}>
                {lineCounter}: {`WAIT ${waitTime}.00(sec)`} ;
              </p>
              <p key={lineCounter++}>
                {lineCounter}: {`P[${item.order}] ${speedMMPerSec}mm/sec FINE`}{" "}
                ;
              </p>
            </>
          );
        return (
          <p key={lineCounter++}>
            {lineCounter}: {`P[${item.order}] ${speedMMPerSec}mm/sec FINE`} ;
          </p>
        );
      });
    });

    console.log(lines);
    return lines;
  }

  useEffect(() => {
    function generatePoints(): GeneratePointProps[] {
      let heightOffset = Z;
      let myArray = [] as GeneratePointProps[];
      let testeArray = [] as Array<GeneratePointProps[]>;
      let counter = 0;
      Array.from({
        length: totalLines,
      }).map((_, line) => {
        line > 0 && (heightOffset += lineHeight);
        const point = Array.from({ length: LINES + APPROACH_STEPS }).map(
          (_, point) => {
            counter++;
            if (point == 0)
              return {
                X: X,
                Y: Y,
                Z: heightOffset + APPROACH_OFFSET,
                W: W,
                P: P,
                R: R,
                order: counter,
                userToolTorch,
                userToolCO2,
                isCO2,
              };
            if (point == 1)
              return {
                X: X,
                Y: Y,
                Z: heightOffset,
                W: W,
                P: P,
                R: R,
                order: counter,
                userToolTorch,
                userToolCO2,
                isCO2,
              };
            if (point == 2)
              return {
                X: X + offset,
                Y: Y,
                Z: heightOffset,
                W: W,
                P: P,
                R: R,
                order: counter,
                userToolTorch,
                userToolCO2,
                isCO2,
              };

            if (point == 3)
              return {
                X: X + offset,
                Y: Y + offset,
                Z: heightOffset,
                W: W,
                P: P,
                R: R,
                order: counter,
                userToolTorch,
                userToolCO2,
                isCO2,
              };
            if (point == 4)
              return {
                X: X,
                Y: Y + offset,
                Z: heightOffset,
                W: W,
                P: P,
                R: R,
                order: counter,
                userToolTorch,
                userToolCO2,
                isCO2,
              };

            if (point == 5)
              return {
                X: X,
                Y: Y,
                Z: heightOffset + APPROACH_OFFSET,
                W: W,
                P: P,
                R: R,
                order: counter,
                userToolTorch,
                userToolCO2,
                isCO2,
              };
            return {} as GeneratePointProps;
          }
        );

        point.forEach((item) => {
          myArray.push(item);
        });
        testeArray.push(point);
      });
      setPointsArray(testeArray);
      console.log(pointsArray);
      return myArray;
    }

    const newPoints = generatePoints();
    setCubePoints(newPoints);
  }, [X, Y, Z, W, P, R, offset, totalLines, lineHeight, userToolCO2, userToolTorch, isCO2, pointsArray]);

  return (
    <>
      <div className="wrapper">
        <main className="container w-full max-h-[1000px] overflow-auto mt-5 flex flex-row flex-wrap gap-7">
          <section>
            <label htmlFor="X">
              <span>X: </span>
              <input
                name="X"
                value={X}
                type="number"
                onChange={(ev) => handlePointsChange(setX, ev)}
              ></input>
            </label>
            <label htmlFor="Y">
              <span>Y: </span>
              <input
                name="Y"
                value={Y}
                type="number"
                onChange={(ev) => handlePointsChange(setY, ev)}
              ></input>
            </label>
            <label htmlFor="Z">
              <span>Z: </span>
              <input
                name="Z"
                value={Z}
                type="number"
                onChange={(ev) => handlePointsChange(setZ, ev)}
              ></input>
            </label>

            <label htmlFor="W">
              <span>W: </span>
              <input
                name="W"
                value={W}
                type="number"
                onChange={(ev) => handlePointsChange(setW, ev)}
              ></input>
            </label>
            <label htmlFor="P">
              <span>P: </span>
              <input
                name="P"
                value={P}
                type="number"
                onChange={(ev) => handlePointsChange(setP, ev)}
              ></input>
            </label>
            <label htmlFor="R">
              <span>R: </span>
              <input
                name="R"
                value={R}
                type="number"
                onChange={(ev) => handlePointsChange(setR, ev)}
              ></input>
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
            <section className="max-full overflow-auto">
              {cubePoints.map((item, index) => {
                return <Point key={index} {...item} />;
              })}
            </section>
          </article>
        </main>
        <article>
          <div className="container w-full max-h-[1000px] overflow-auto mt-5 flex flex-row flex-wrap gap-7">
            <section>
              <label htmlFor="torchDO">
                <span>torchDO: </span>
                <input
                  name="torchDO"
                  value={torchDO}
                  type="number"
                  onChange={(ev) => handlePointsChange(setTorchDO, ev)}
                ></input>
              </label>

              <label htmlFor="userToolTroch">
                <span>userToolTroch: </span>
                <input
                  name="userToolTroch"
                  value={userToolTorch}
                  type="number"
                  onChange={(ev) => handlePointsChange(setUserToolTorch, ev)}
                ></input>
              </label>

              <label htmlFor="">
                <span>isCO2</span>
                <input
                  name="isCO2"
                  type="checkbox"
                  checked={isCO2}
                  onChange={() => setIsCO2((old) => !old)}
                />
              </label>

              <label htmlFor="userToolCO2">
                <span>userToolCO2: </span>
                <input
                  name="userToolCO2"
                  value={userToolCO2}
                  type="number"
                  disabled={!isCO2}
                  onChange={(ev) => handlePointsChange(setUserToolCO2, ev)}
                ></input>
              </label>

              <label htmlFor="waitTime">
                <span>waitTime: </span>
                <input
                  name="waitTime"
                  value={waitTime}
                  type="number"
                  onChange={(ev) => handlePointsChange(setWaitTime, ev)}
                ></input>
              </label>
            </section>
          </div>

          <h1 className="text-3xl mt-5">Programa</h1>
          <p>/PROG {programName}</p>
          <p>/ATTR</p>
          <p>OWNER = MNEDITOR;</p>
          <p>COMMENT = {'""'};</p>
          <p>PROG_SIZE = ;</p>
          <p>CREATE = DATE 22-06-06 TIME 15:30:00;</p>
          <p>MODIFIED = DATE 22-06-06 TIME 15:35:00;</p>
          <p>FILE_NAME = ;</p>
          <p>VERSION = 0;</p>
          <p>LINE_COUNT = ;</p>
          <p>MEMORY_SIZE = ;</p>
          <p>PROTECT = READ_WRITE;</p>
          <p>
            TCD: STACK_SIZE = 0, TASK_PRIORITY = 50, TIME_SLICE = 0,
            BUSY_LAMP_OFF = 0, ABORT_REQUEST = 0, PAUSE_REQUEST = 0
          </p>
          <p>DEFAULT_GROUP = 1,*,*,*,*;</p>
          <p>CONTROL_CODE = 00000000 00000000;</p>
          <p>/APPL</p>
          <p>ARC Welding Equipment : 1,*,*,*,*;</p>
          <p>/MN</p>
          {printLines(false)}
          <p>/POS</p>
          <section className="max-full overflow-auto">
            {cubePoints.map((item, index) => {
              return <Point key={index} {...item} />;
            })}
          </section>
          <p>/END</p>
        </article>
      </div>
    </>
  );
};

export default Home;
