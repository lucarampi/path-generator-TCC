export interface PointProps {
    X: number;
    Y: number;
    Z: number;
    W: number;
    P: number;
    R: number;
    order: number;
  }



  export default function Point({ order, X, Y, Z, W, P, R }: PointProps) {
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