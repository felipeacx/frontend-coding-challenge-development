import { createContext, useCallback, useContext } from 'react';
import { ToastType } from './types';

interface ToastProps {
  renderToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastProps | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line
  const renderToast = useCallback((type: ToastType, message: string) => {
    console.error('TODO: implement the renderToast(type, message)');
  }, []);

  return (
    <ToastContext.Provider
      value={{
        renderToast,
      }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};
