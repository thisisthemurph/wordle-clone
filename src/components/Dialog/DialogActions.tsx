import { ReactNode } from "react";

interface DialogOptionsProps {
  children: ReactNode;
}

export const DialogActions = ({ children }: DialogOptionsProps) => {
  return <div className="dialog__container dialog__actions">{children}</div>;
};
