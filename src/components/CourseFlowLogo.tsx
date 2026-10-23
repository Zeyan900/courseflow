import React from 'react';

interface CourseFlowLogoProps {
  size?: number;
  className?: string;
}

export const CourseFlowLogo: React.FC<CourseFlowLogoProps> = ({
  size = 32,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cf-logo-svg ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cf-emerald-stream" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0D4C3C" />
          <stop offset="60%" stopColor="#12624C" />
          <stop offset="100%" stopColor="#7AA05A" />
        </linearGradient>
        <linearGradient id="cf-ivory-ribbon" x1="8" y1="8" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F8F6F0" />
          <stop offset="100%" stopColor="#C8C5BC" />
        </linearGradient>
        <filter id="cf-violet-glow" x="18" y="4" width="16" height="16" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Frame */}
      <rect width="36" height="36" rx="9" fill="#151513" stroke="#30302D" strokeWidth="1" />

      {/* Procedural Flow Arc 1 - Dark Emerald to Moss Base Stream */}
      <path
        d="M9 25C9 17.5 13.5 11 20 11C23.5 11 26 12.8 27.5 15"
        stroke="url(#cf-emerald-stream)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Procedural Flow Arc 2 - Forward Guide Channel */}
      <path
        d="M27 11C27 18.5 22.5 25 16 25C13 25 10.5 23.8 9 22"
        stroke="url(#cf-emerald-stream)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />

      {/* Center Directional Waypoint Ribbon */}
      <path
        d="M13 18.5L18 23.5L25 14"
        stroke="url(#cf-ivory-ribbon)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Distinct Luminous Waypoint Beacon - Electric Violet Accent */}
      <circle cx="26" cy="10" r="2.8" fill="#A55BFF" filter="url(#cf-violet-glow)" />
      <circle cx="26" cy="10" r="1.6" fill="#F8F6F0" />
    </svg>
  );
};
