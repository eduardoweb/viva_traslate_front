import { useSnackbar } from 'notistack';
import { VARIANTS } from '../../constants/Variants';

export default function StackMessage() {
  const { enqueueSnackbar } = useSnackbar();
  const options = { variant: 'default', autoHideDuration: 3000 };

  const enqueueSnackMessage = (message, variant) => {
    enqueueSnackbar(message, { ...options, variant });
  };

  return { enqueueSnackMessage, VARIANTS };
}
