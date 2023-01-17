import {useEffect} from 'react';
import {useToast} from 'react-native-toast-notifications';

function showSuccess(): any {
  const toast = useToast();

  useEffect(() => {
    toast.show('Task finished successfully', {
      type: 'danger',
      placement: 'bottom',
      duration: 4000,
      // offset: 30,
      animationType: 'zoom-in',
    });
  }, [toast]);

  return toast;
}

export {showSuccess};
