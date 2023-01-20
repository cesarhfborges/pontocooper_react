import React, {createContext, useContext, useRef} from 'react';
import DropdownAlert, {CloseActionType, DropdownAlertType} from 'react-native-dropdownalert';

type ToastContextData = {
  dropDownAlert: {
    alertWithType(
      type: DropdownAlertType,
      title: string,
      message: string,
      payload?: object,
      interval?: number,
    ): void;
    closeAction(action?: CloseActionType, onDone?: () => void): void;
    clearQueue(): void;
    getQueueSize(): number;
  };
};

const ToastContext = createContext<ToastContextData>({} as ToastContextData);
const {Provider} = ToastContext;

const DropDownToast: React.FC<any> = ({children}: any) => {
  let dropDownAlert: any = useRef<any>(null);
  return (
    <Provider value={{dropDownAlert: dropDownAlert.current}}>
      <DropdownAlert closeInterval={5000} zIndex={99999999999} ref={dropDownAlert} />
      {children}
    </Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }
  return context;
}

export {DropDownToast, useToast};
