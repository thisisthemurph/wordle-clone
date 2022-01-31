export interface KeyObject {
  value: string;
  action: () => void;
}

export enum KeyStyle {
  Normal = "",
  Correct = "correct",
  WrongLocation = "wrongLocation",
  Incorrect = "incorrect",
}

interface KeyProps {
  value: string;
  action: () => void;
  style: KeyStyle;
}

export const Key = ({ value, action, style }: KeyProps) => {
  let className = "keyboard__key";
  if (style) {
    className += ` keyboard__key--${style}`;
  }

  return (
    <div className={className} onClick={action}>
      {value}
    </div>
  );
};
