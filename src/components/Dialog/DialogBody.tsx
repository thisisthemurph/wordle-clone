import { ReactNode } from "react";

interface DialogBodyProps {
  children: ReactNode;
}

export const DialogBody = ({ children }: DialogBodyProps) => {
  return <div className="dialog__container dialog__body ">{children}</div>;
};
