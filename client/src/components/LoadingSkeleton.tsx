import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 bg-slate-200 rounded w-48 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column Gallery Skeleton */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full aspect-square max-w-[460px] bg-slate-200 rounded-3xl" />
          <div className="flex gap-3 mt-4">
            <div className="w-16 h-16 bg-slate-200 rounded-xl" />
            <div className="w-16 h-16 bg-slate-200 rounded-xl" />
            <div className="w-16 h-16 bg-slate-200 rounded-xl" />
          </div>
        </div>

        {/* Right Column Details Skeleton */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-24" />
            <div className="h-8 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded w-1/3" />
          </div>

          <div className="h-20 bg-slate-200 rounded-2xl" />

          <div className="space-y-3 py-4 border-y border-slate-200">
            <div className="h-4 bg-slate-200 rounded w-32" />
            <div className="flex gap-2">
              <div className="h-9 w-20 bg-slate-200 rounded-xl" />
              <div className="h-9 w-20 bg-slate-200 rounded-xl" />
              <div className="h-9 w-20 bg-slate-200 rounded-xl" />
            </div>
            <div className="flex gap-3 mt-3">
              <div className="w-10 h-10 bg-slate-200 rounded-full" />
              <div className="w-10 h-10 bg-slate-200 rounded-full" />
              <div className="w-10 h-10 bg-slate-200 rounded-full" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-6 bg-slate-200 rounded w-64" />
            <div className="h-20 bg-slate-200 rounded-2xl" />
            <div className="h-20 bg-slate-200 rounded-2xl" />
            <div className="h-20 bg-slate-200 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
