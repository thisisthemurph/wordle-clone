import { ReactNode } from "react";

interface DialogButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
}

export enum ButtonVariant {
  Text = "dialog__button--text",
  Contained = "",
  Outlined = "dialog__button--outlined",
}

export const DialogButton = ({
  children,
  onClick,
  variant = ButtonVariant.Contained,
}: DialogButtonProps) => {
  const makeClassName = (): string => {
    return "dialog__button " + variant;
  };

  return (
    <button className={makeClassName()} onClick={onClick}>
      {children}
    </button>
  );
};
