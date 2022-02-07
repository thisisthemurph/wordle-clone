import { useLocalStorage } from "./useLocalStorage";

interface GameState {
  answer: string;
  guesses: string[];
  correctLetters: string[];
  wrongLocationLetters: string[];
  incorrectLetters: string[];
  gameStage: GameStage;
}

export enum GameStage {
  GameLoading,
  GameInProgress,
  GameWon,
  GameLost,
}

export const initialGameState: GameState = {
  answer: "",
  guesses: [""],
  correctLetters: [],
  wrongLocationLetters: [],
  incorrectLetters: [],
  gameStage: GameStage.GameLoading,
};

const GAME_STATE_KEY = "gameState";

export const useGameState = () => {
  return useLocalStorage<GameState>(GAME_STATE_KEY, initialGameState);
};
