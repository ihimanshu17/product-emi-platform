import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm ring-8 ring-blue-50/50">
          <Compass className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
            Error 404
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            The page or product you are looking for doesn’t exist, has been moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
