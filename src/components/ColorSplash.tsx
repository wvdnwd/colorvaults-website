'use client';

import React from'react';
import styles from'./ColorSplash.module.css';

export default function ColorSplash() {
  return (
    <div className={styles.splashContainer} aria-hidden="true">
      {/* Soft Radiant Watercolor Wash */}
      <div className={styles.splashBackdrop} />

      {/* High-Resolution Watercolor Paint Explosion */}
      <svg
        className={styles.splashSvg}
        viewBox="0 0 800 600"fill="none"xmlns="http://www.w3.org/2000/svg"preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="splashGrad1"cx="40%"cy="35%"r="60%">
            <stop offset="0%"stopColor="#FF2E93"stopOpacity="0.95"/>
            <stop offset="40%"stopColor="#9B51E0"stopOpacity="0.85"/>
            <stop offset="75%"stopColor="#00D2D3"stopOpacity="0.6"/>
            <stop offset="100%"stopColor="#00D2D3"stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="splashGrad2"cx="60%"cy="45%"r="55%">
            <stop offset="0%"stopColor="#00E5FF"stopOpacity="0.95"/>
            <stop offset="45%"stopColor="#10B981"stopOpacity="0.85"/>
            <stop offset="80%"stopColor="#FFB300"stopOpacity="0.6"/>
            <stop offset="100%"stopColor="#FFB300"stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="splashGrad3"cx="50%"cy="60%"r="50%">
            <stop offset="0%"stopColor="#FF9F43"stopOpacity="0.95"/>
            <stop offset="40%"stopColor="#FF5252"stopOpacity="0.85"/>
            <stop offset="75%"stopColor="#E040FB"stopOpacity="0.55"/>
            <stop offset="100%"stopColor="#7C3AED"stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="splashCore"cx="50%"cy="50%"r="45%">
            <stop offset="0%"stopColor="#FFFFFF"stopOpacity="0.5"/>
            <stop offset="30%"stopColor="#FF6B8B"stopOpacity="0.85"/>
            <stop offset="65%"stopColor="#7C3AED"stopOpacity="0.85"/>
            <stop offset="100%"stopColor="#00D2D3"stopOpacity="0"/>
          </radialGradient>
          <filter id="watercolorBlur"x="-20%"y="-20%"width="140%"height="140%">
            <feGaussianBlur stdDeviation="18"result="blur"/>
            <feComposite in="SourceGraphic"in2="blur"operator="over"/>
          </filter>
        </defs>

        {/* Organic Watercolor Clouds */}
        <g filter="url(#watercolorBlur)">
          <path
            d="M420,130 C520,110 610,160 640,240 C670,320 620,410 540,460 C460,510 330,520 250,470 C170,420 140,320 170,230 C200,140 320,150 420,130 Z"fill="url(#splashCore)"opacity="0.95"/>
          <path
            d="M360,90 C460,70 560,110 590,180 C620,250 560,300 480,280 C400,260 300,290 240,240 C180,190 260,110 360,90 Z"fill="url(#splashGrad1)"opacity="0.9"/>
          <path
            d="M470,220 C570,200 660,260 680,340 C700,420 640,490 560,490 C480,490 430,420 380,380 C330,340 370,240 470,220 Z"fill="url(#splashGrad2)"opacity="0.9"/>
          <path
            d="M280,300 C370,290 440,350 470,420 C500,490 440,540 360,550 C280,560 210,510 180,440 C150,370 190,310 280,300 Z"fill="url(#splashGrad3)"opacity="0.9"/>
        </g>

        {/* Paint Splatter Droplets */}
        <circle cx="190"cy="120"r="14"fill="#FF2E93"opacity="0.9"/>
        <circle cx="160"cy="160"r="8"fill="#9B51E0"opacity="0.8"/>
        <circle cx="220"cy="90"r="6"fill="#FF6B8B"opacity="0.95"/>
        <circle cx="130"cy="210"r="10"fill="#7C3AED"opacity="0.85"/>
        <circle cx="630"cy="140"r="16"fill="#00E5FF"opacity="0.9"/>
        <circle cx="680"cy="180"r="9"fill="#00D2D3"opacity="0.85"/>
        <circle cx="600"cy="90"r="7"fill="#FF2E93"opacity="0.9"/>
        <circle cx="710"cy="240"r="12"fill="#10B981"opacity="0.8"/>
        <circle cx="620"cy="480"r="14"fill="#FFB300"opacity="0.9"/>
        <circle cx="560"cy="540"r="9"fill="#FF5252"opacity="0.85"/>
        <circle cx="230"cy="510"r="15"fill="#FF9F43"opacity="0.9"/>
        <circle cx="150"cy="460"r="8"fill="#10B981"opacity="0.85"/>
        <circle cx="320"cy="560"r="11"fill="#FF2E93"opacity="0.8"/>
      </svg>
    </div>
  );
}
