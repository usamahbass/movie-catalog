import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";

const CustomAlertDialog = ({
  isOpen,
  onClose,
  title,
  children,
  leftButton,
  rightButton,
  colorSchemeLeftButton,
  colorSchemeRightButton,
  handleAction,
}) => {
  return (
    <AlertDialog isOpen={isOpen} I onClose={onClose} motionPreset="slideInBottom">
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{children}</AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme={colorSchemeLeftButton} onClick={onClose}>
              {leftButton}
            </Button>
            <Button
              colorScheme={colorSchemeRightButton}
              onClick={handleAction}
              ml={3}
            >
              {rightButton}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
