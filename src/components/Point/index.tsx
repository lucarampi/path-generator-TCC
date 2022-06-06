export interface PointProps {
  X: number;
  Y: number;
  Z: number;
  W: number;
  P: number;
  R: number;
  order: number;
  userToolTorch: number;
  userToolCO2: number;
  isCO2: boolean;
}

export default function Point({order, X, Y, Z, W, P, R,isCO2,userToolCO2,userToolTorch }: PointProps) {
  return (
    <div>
      {`P[${order}]{
      GP1:
     UF : 1, UT : ${isCO2 ? userToolCO2 : userToolTorch},		CONFIG : 'N U T, 0, 0, 0',
     X =  ${X}  mm,	Y =   ${Y}  mm,	Z =     ${Z}  mm,
     W =      ${W} deg,	P =     ${P} deg,	R =    ${R} deg
   };`}
    </div>
  );
}
