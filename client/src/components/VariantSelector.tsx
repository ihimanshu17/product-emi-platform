import React from 'react';
import { Check, Sparkles } from 'lucide-react';

interface VariantSelectorProps {
  availableStorages: string[];
  selectedStorage: string;
  onSelectStorage: (storage: string) => void;
  availableColors: { colorName: string; colorHex: string }[];
  selectedColorName: string;
  onSelectColor: (colorName: string) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  availableStorages,
  selectedStorage,
  onSelectStorage,
  availableColors,
  selectedColorName,
  onSelectColor,
}) => {
  return (
    <div className="space-y-6 pt-3 pb-5 border-y border-slate-200/90">
      {/* 1. Storage Capacity Selector */}
      {availableStorages.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
              <span>Storage Configuration:</span>
              <span className="text-blue-600 font-bold normal-case text-sm">
                {selectedStorage}
              </span>
            </label>
            <span className="text-[11px] text-slate-500 font-medium">
              {availableStorages.length} options available
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Storage Capacity">
            {availableStorages.map((storage) => {
              const isSelected = selectedStorage === storage;
              return (
                <button
                  key={storage}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onSelectStorage(storage)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border-2 cursor-pointer flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md shadow-slate-900/15 scale-[1.02]'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>{storage}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Color Finish Selector */}
      {availableColors.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
              <span>Authentic Finish:</span>
              <span className="text-blue-600 font-bold normal-case text-sm">
                {selectedColorName}
              </span>
            </label>
            <span className="text-[11px] text-slate-500 font-medium">
              Available in {availableColors.length} colors
            </span>
          </div>

          <div className="flex items-center gap-3.5" role="radiogroup" aria-label="Device Color Finish">
            {availableColors.map((color) => {
              const isSelected = selectedColorName === color.colorName;
              const isLightColor =
                color.colorHex.toLowerCase() === '#ffffff' ||
                color.colorHex.toLowerCase() === '#f2efeb' ||
                color.colorHex.toLowerCase() === '#e3e4e5' ||
                color.colorHex.toLowerCase() === '#fafafa';

              return (
                <button
                  key={color.colorName}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  title={color.colorName}
                  onClick={() => onSelectColor(color.colorName)}
                  className={`group relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-blue-600 ring-offset-2 scale-110 shadow-sm'
                      : 'hover:scale-105 opacity-85 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.colorHex }}
                >
                  {/* Subtle inner shadow border for separation on white backgrounds */}
                  <span className="absolute inset-0 rounded-full border border-black/15 pointer-events-none" />

                  {/* Animated checkmark on selected finish */}
                  {isSelected && (
                    <Check
                      className={`w-4 h-4 transition-transform ${
                        isLightColor ? 'text-slate-950' : 'text-white'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
