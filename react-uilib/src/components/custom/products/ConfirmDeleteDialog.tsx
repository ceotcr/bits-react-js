import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel, AlertDialogHeader, AlertDialogTitle } from "../../ui/alert-dialog";

interface ConfirmDeleteDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDeleteDialog = ({ open, onClose, onConfirm }: ConfirmDeleteDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={(open) => !open && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-sans">Delete Product</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Are you sure you want to delete this product?
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="cursor-pointer" onClick={onConfirm}>
                        Yes
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmDeleteDialog;
