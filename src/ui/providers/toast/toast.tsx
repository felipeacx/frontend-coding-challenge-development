import { createContext, useCallback, useContext, useState } from 'react';
import { ToastType } from './types';

interface ToastProps {
  renderToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastProps | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<{ type?: ToastType; message?: string }>({});
  // eslint-disable-next-line
  const renderToast = useCallback((type: ToastType, message: string) => {
    setToasts({ type, message });
    setTimeout(() => {
      setToasts({});
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider
      value={{
        renderToast,
      }}>
      {children}
      {toasts.message && (
        <div className='fixed bottom-0 left-0 p-4'>
          <div className={`p-4 mb-4 rounded text-white ${toasts.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {toasts.message}
          </div>
        </div>
      )}
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
