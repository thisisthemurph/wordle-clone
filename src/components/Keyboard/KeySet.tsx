import { Key, KeyObject } from "./Key";

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
  return (
    <div className="keyboard__row">
      {keys.map((key) => (
        <Key
          keyItem={key}
          // value={key.value}
          // action={canType ? key.action : () => {}}
          // style={getKeyStyle(key.value)}
          canType={canType}
          correctLetters={correctLetters}
          wrongLocationLetters={wrongLocationLetters}
          incorrectLetters={incorrectLetters}
        />
      ))}
    </div>
  );
};
