/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'symbol' | 'full';
}

function EmblemPaths({ strokeColor, strokeWidth = 6 }: { strokeColor: string; strokeWidth?: number }) {
  return (
    <>
      {/* Outer Square frame with sharp corners */}
      <rect
        x="3"
        y="3"
        width="94"
        height="94"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="miter"
        strokeLinecap="square"
        fill="none"
      />
      
      {/* Horizontal base line at y = 81 */}
      <line
        x1="3"
        y1="81"
        x2="97"
        y2="81"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
      />
      
      {/* Left Stem (Stem 1) - from y = 3 to y = 55 */}
      <line
        x1="27"
        y1="3"
        x2="27"
        y2="55"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
      />
      
      {/* Right Stem (Stem 2) - from y = 3 to y = 55 */}
      <line
        x1="73"
        y1="3"
        x2="73"
        y2="55"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
      />
      
      {/* Left Valley: from left border (3, 72) to Stem 1 (27, 55) */}
      <path
        d="M 3 72 C 12 85, 22 85, 27 55"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Middle Valley: deep U-shape between Stem 1 and Stem 2 */}
      <path
        d="M 27 55 C 27 90, 73 90, 73 55"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Right Valley: from Stem 2 (73, 55) to right border (97, 72) */}
      <path
        d="M 73 55 C 78 85, 88 85, 97 72"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Leaf 1 (bottom-left) - padded from left border */}
      <path
        d="M 8 26 C 13 14, 21 23, 27 36 C 21 44, 13 39, 8 26 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Leaf 2 (top-left) - padded from top border */}
      <path
        d="M 27 27 C 27 15, 37 9, 48 9 C 40 18, 36 27, 27 27 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Leaf 3 (center-middle) */}
      <path
        d="M 48 24 C 54 18, 65 24, 73 36 C 62 42, 54 34, 48 24 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Leaf 4 (top-right) - padded from top and right borders */}
      <path
        d="M 73 27 C 73 15, 82 9, 91 16 C 85 25, 79 30, 73 27 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  );
}

export default function Logo({ className = '', variant = 'symbol' }: LogoProps) {
  // Official Corporate Identity brand red color
  const brandRed = '#D1291A';

  if (variant === 'full') {
    return (
      <svg
        viewBox="0 0 320 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Emblem on the Left (scaled down and perfectly centered) */}
        <g transform="translate(10, 10) scale(0.8)">
          <EmblemPaths strokeColor={brandRed} strokeWidth={6} />
        </g>

        {/* Text Group on the Right */}
        <g transform="translate(105, 15)">
          {/* Hangeul logo */}
          <text
            x="0"
            y="42"
            fill={brandRed}
            fontFamily="system-ui, -apple-system, 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif"
            fontWeight="900"
            fontSize="45"
            letterSpacing="-0.03em"
          >
            순순
          </text>
          
          {/* Spaced English subtitle */}
          <text
            x="2"
            y="62"
            fill={brandRed}
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="500"
            fontSize="12.5"
            letterSpacing="0.48em"
          >
            SOONSOON
          </text>
        </g>
      </svg>
    );
  }

  // Symbol Variant (Pure emblem square, adaptive via currentColor)
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <EmblemPaths strokeColor="currentColor" strokeWidth={6} />
    </svg>
  );
}
