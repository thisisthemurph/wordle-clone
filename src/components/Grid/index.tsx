import { WordField } from "./WordField";
import "./Grid.scss";

interface GridProps {
  guesses: string[];
  answer: string;
  activeIndex: number;
}

export const Grid = ({ guesses, answer, activeIndex }: GridProps) => {
  return (
    <div className="grid">
      {guesses.map((guess, idx) => (
        <WordField
          key={idx}
          answer={answer}
          guess={guess}
          isActive={idx === guesses.length - 1}
        />
      ))}
      {[...Array(6 - guesses.length)].map((_, idx) => (
        <WordField key={idx} answer={answer} isActive={false} />
      ))}
    </div>
  );
};
