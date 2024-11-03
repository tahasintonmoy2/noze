import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const DeleteProjectModal = ({
  open,
  onClose,
  onConfirm,
  loading,
}: DialogModalProps) => {
  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure to delete</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              project and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button disabled={loading} onClick={onClose} variant="outline">
                Cancel
              </Button>
              <Button
                disabled={loading}
                onClick={onConfirm}
                variant="destructive"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="loader"></div>
                    <p className="text-white">Deleting</p>
                  </div>
                ) : (
                  <>
                    <p className="text-white">Delete</p>
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
