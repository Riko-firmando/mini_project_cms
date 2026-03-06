import { CheckCircle, XCircle, X } from "lucide-react";
import useToastStore from "../../store/toastStore";

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  const icons = {
    success: <CheckCircle className="w-6 h-6 text-green-500" />,
    error: <XCircle className="w-6 h-6 text-red-500" />,
  };

  const bgColors = {
    success: "border-green-100 bg-green-50",
    error: "border-red-100 bg-red-50",
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-3 w-full max-w-xs sm:max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 p-4 w-full rounded-xl border shadow-lg animate-in slide-in-from-top-full duration-300 ${bgColors[toast.type]}`}
        >
          <span>{icons[toast.type]}</span>
          <p className="flex-1 text-sm font-medium text-slate-800">
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 hover:bg-black/5 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
