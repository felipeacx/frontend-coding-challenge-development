export type ToastType = 'success' | 'error';
export type ToastInput = {
  type: ToastType;
  body: React.ReactNode;
};
export type APIResponse =
  | {
      data?: any;
      status?: string;
      message?: string;
    }
  | undefined;
