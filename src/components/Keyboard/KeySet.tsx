import { Key, KeyObject, KeyStyle } from "./Key";

interface KeySetProps {
  keys: KeyObject[];
  canType: boolean;
  correctLetters: string[];
  wrongLocationLetters: string[];
  incorrectLetters: string[];
}

export const KeySet = ({
  keys,
  canType,
  correctLetters,
  wrongLocationLetters,
  incorrectLetters,
}: KeySetProps) => {
  const getKeyStyle = (keyValue: string): KeyStyle => {
    if (correctLetters.includes(keyValue)) {
      return KeyStyle.Correct;
    } else if (wrongLocationLetters.includes(keyValue)) {
      return KeyStyle.WrongLocation;
    } else if (incorrectLetters.includes(keyValue)) {
      return KeyStyle.Incorrect;
    }

    return KeyStyle.Normal;
  };

  return (
    <div className="keyboard__row">
      {keys.map((key) => (
        <Key
          key={key.value}
          value={key.value}
          action={canType ? key.action : () => {}}
          style={getKeyStyle(key.value)}
        />
      ))}
    </div>
  );
};
