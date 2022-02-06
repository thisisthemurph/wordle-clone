import { Dialog, DialogBody, DialogHeader } from "./Dialog";

interface AboutDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
}

export const AboutDialog = ({
  showDialog,
  setShowDialog,
}: AboutDialogProps) => {
  return (
    <Dialog
      fullScreen
      isOpen={showDialog}
      handleClose={() => setShowDialog(false)}
    >
      <DialogHeader text="How to play..." />
      <DialogBody>
        <p>
          This is a clone of the popular Wordle game, which can be found{" "}
          <a href="https://www.powerlanguage.co.uk/wordle/">here</a>.
        </p>

        <hr />

        <p>
          Each guess must be a valid 5 letter word. Hit the enter button to
          submit.
        </p>
        <p>
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.
        </p>

        <hr />

        <p>
          A letter guessed correctly in the correct location will be coloured
          green.
        </p>
        <p>
          A letter guessed correctly but in an incorrect location will be
          coloured orange.
        </p>
        <p>
          A letter guessed that is not in the word will be coloured a dark
          grey/black.
        </p>
      </DialogBody>
    </Dialog>
  );
};
