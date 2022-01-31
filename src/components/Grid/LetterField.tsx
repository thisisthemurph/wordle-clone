export enum LetterState {
  CorrectLocation = "correctLocation",
  CorrectWrongLocation = "correctWrongLocation",
  Incorrect = "incorrect",
  Unknown = "",
}

interface LetterFieldProps {
  letter: string;
  letterState: LetterState;
}

export const LetterField = ({
  letter,
  letterState,
}: LetterFieldProps): JSX.Element => {
  const makeClassName = (letterState: LetterState): string => {
    return `grid__letter grid__letter--${letterState}`;
  };

  return <div className={makeClassName(letterState)}>{letter}</div>;
};
