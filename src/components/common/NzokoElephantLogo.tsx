import React from 'react';

interface NzokoElephantLogoProps {
  className?: string;
  size?: number;
  withText?: boolean;
  textColor?: 'dark' | 'white';
  variant?: 'gold' | 'default';
}

export default function NzokoElephantLogo({
  className = '',
  size = 36,
  withText = false,
  textColor = 'dark',
}: NzokoElephantLogoProps) {
  return (
    <div className={`inline-flex items-center space-x-2.5 ${className}`}>
      <img
        src="/images/logo.png"
        alt="Logo Officiel Nzoko Transport"
        style={{ width: `${size}px`, height: `${size}px` }}
        className="object-contain rounded-xl shrink-0 shadow-sm transition-transform duration-300 hover:scale-105"
        onError={(e) => {
          // Fallback to logo.jpg if png fails
          const target = e.target as HTMLImageElement;
          if (!target.src.endsWith('logo.jpg')) {
            target.src = '/images/logo.jpg';
          }
        }}
      />
      {withText && (
        <div className="flex flex-col">
          <span
            className={`font-black tracking-tight leading-none ${
              textColor === 'white' ? 'text-white' : 'text-brand-dark'
            }`}
            style={{ fontSize: `${Math.max(14, size * 0.46)}px` }}
          >
            NZOKO
          </span>
          <span
            className="text-brand-yellow font-bold uppercase tracking-[0.28em] leading-none mt-1"
            style={{ fontSize: `${Math.max(8, size * 0.22)}px` }}
          >
            TRANSPORT
          </span>
        </div>
      )}
    </div>
  );
}
