export interface SnackbarControls {
  isOpen: boolean;
  status: {
    message: string;
    success: boolean;
  };
  setStatus: (status: { message: string; success: boolean }) => void;
  setOpen: (open: boolean) => void;
  onClose: () => void;
}
