interface DialogHeaderProps {
  text: string;
}

export const DialogHeader = ({ text }: DialogHeaderProps) => {
  return (
    <div className="dialog__container dialog__header">
      <h2 className="dialog__heading">{text}</h2>
    </div>
  );
};
