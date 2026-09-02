import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'Failed to load data from the server. Please check your connection and try again.',
  onRetry,
  showHomeButton = true,
}) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm ring-8 ring-rose-50">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
      <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">{message}</p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm flex items-center space-x-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
        {showHomeButton && (
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm flex items-center space-x-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Browse Products</span>
          </Link>
        )}
      </div>
    </div>
  );
};
