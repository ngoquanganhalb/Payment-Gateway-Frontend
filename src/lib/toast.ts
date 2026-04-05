import { toast, type ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

export function toastError(message: string, options?: ToastOptions) {
  return toast.error(message, { ...defaultOptions, ...options });
}

export function toastSuccess(message: string, options?: ToastOptions) {
  return toast.success(message, { ...defaultOptions, ...options });
}

export function toastInfo(message: string, options?: ToastOptions) {
  return toast.info(message, { ...defaultOptions, ...options });
}
