export interface KeyObject {
  value: string;
  specialKey: boolean;
  primaryKey: boolean;
  action: () => void;
}

export enum KeyStatus {
  Normal = "",
  Correct = "correct",
  WrongLocation = "wrongLocation",
  Incorrect = "incorrect",
}

interface KeyProps {
  keyItem: KeyObject;
  canType: boolean;
  correctLetters: string[];
  wrongLocationLetters: string[];
  incorrectLetters: string[];
}

export const Key = ({
  keyItem,
  canType,
  correctLetters,
  wrongLocationLetters,
  incorrectLetters,
}: KeyProps) => {
  const getKeyStatus = (): KeyStatus => {
    if (correctLetters.includes(keyItem.value)) {
      return KeyStatus.Correct;
    } else if (wrongLocationLetters.includes(keyItem.value)) {
      return KeyStatus.WrongLocation;
    } else if (incorrectLetters.includes(keyItem.value)) {
      return KeyStatus.Incorrect;
    }

    return KeyStatus.Normal;
  };

  const getClassName = (): string => {
    let className = `keyboard__key`;

    const status = getKeyStatus();
    if (status !== KeyStatus.Normal) {
      className += ` keyboard__key--${getKeyStatus()}`;
    }

    if (keyItem.primaryKey) {
      className += " keyboard__key--primary";
    }

    if (keyItem.specialKey) {
      className += " keyboard__key--special";
    }

    return className;
  };

  const handleClick = () => {
    if (canType) {
      keyItem.action();
    }
  };

  return (
    <div className={getClassName()} onClick={handleClick}>
      {keyItem.value}
    </div>
  );
};
