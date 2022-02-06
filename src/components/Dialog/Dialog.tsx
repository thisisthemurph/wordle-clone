import { ReactNode } from "react";
import { CloseIcon } from "../../icons";

import "./Dialog.scss";

export interface DialogProps {
  isOpen: boolean;
  fullScreen?: boolean;
  handleClose: () => void;
  children: ReactNode;
}

export const Dialog = ({
  isOpen,
  handleClose,
  fullScreen,
  children,
}: DialogProps) => {
  if (!isOpen) return null;

  const className = fullScreen ? "dialog dialog--fullscreen" : "dialog";

  return (
    <div className="dialog__fill" onClick={handleClose}>
      <div className={className}>
        <div className="dialog__container dialog__titlebar">
          <button onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
