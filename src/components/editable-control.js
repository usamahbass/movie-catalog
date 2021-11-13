import {
  useEditableControls,
  Flex,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import {
  Check as CheckIcon,
  X as CloseIcon,
  Edit as EditIcon,
} from "react-feather";

const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        variant="ghost"
        colorScheme="warning"
        size="sm"
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
};

export default EditableControls;
