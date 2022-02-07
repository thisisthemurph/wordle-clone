import { Dialog, DialogBody, DialogHeader } from "./Dialog";
import { DialogActions } from "./Dialog/DialogActions";
import { ButtonVariant, DialogButton } from "./Dialog/DialogButton";

interface StatsDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  resetGame: () => void;
}

export const StatsDialog = ({
  showDialog,
  setShowDialog,
  resetGame,
}: StatsDialogProps) => {
  const handleCloseDialog = () => setShowDialog(false);

  return (
    <Dialog isOpen={showDialog} handleClose={handleCloseDialog}>
      <DialogHeader text="Wordle Statistics" />

      <DialogBody>
        <p>This section has not yet been implemented.</p>
      </DialogBody>

      <DialogActions>
        <DialogButton
          variant={ButtonVariant.Outlined}
          onClick={handleCloseDialog}
        >
          Close
        </DialogButton>
        <DialogButton onClick={resetGame}>New Game</DialogButton>
      </DialogActions>
    </Dialog>
  );
};
