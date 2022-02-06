import { Dialog, DialogBody, DialogHeader } from "./Dialog";

interface StatsDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
}

export const StatsDialog = ({
  showDialog,
  setShowDialog,
}: StatsDialogProps) => {
  return (
    <Dialog isOpen={showDialog} handleClose={() => setShowDialog(false)}>
      <DialogHeader text="Wordle Statistics" />
      <DialogBody>
        <p>This section has not yet been implemented.</p>
      </DialogBody>
    </Dialog>
  );
};
