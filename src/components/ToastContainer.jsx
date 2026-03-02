import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const bgMap = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-3">
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type] || Info;
        const bg = bgMap[toast.type] || 'bg-blue-500';

        return (
          <div
            key={toast.id}
            className={`${bg} animate-slide-in-right flex items-center gap-2 rounded-lg px-4 py-3 text-white shadow-lg`}
          >
            <Icon size={18} />
            <span className="text-sm font-medium">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 rounded p-0.5 transition hover:bg-white/20"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
