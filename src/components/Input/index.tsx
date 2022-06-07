export interface InputProps {
  setFunction: React.Dispatch<React.SetStateAction<any>>;
  value: number;
  type: "number" | "text" | "checkbox";
  isDisabled?: boolean;
  displayName: string;
  name:string;
  min?:number;
  step?:number
}

export default function Input({
  displayName,
  name,
  setFunction,
  type,
  value,
  step,
  min,
  isDisabled,
}: InputProps) {
  function handlePointsChange(
    setFunction: React.Dispatch<React.SetStateAction<any>>,
    ev: React.ChangeEvent<HTMLInputElement>
  ) {
    setFunction(Number(ev.target.value));
  }

  return (
    <label htmlFor={name}>
      <span>{displayName}: </span>
      <input
        name={name}
        value={value}
        disabled={isDisabled}
        type={type}
        step={step ? step : 1}
        min={min && min}
        onChange={(ev) => handlePointsChange(setFunction, ev)}
      ></input>
    </label>
  );
}
