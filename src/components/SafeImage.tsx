'use client';

import { useState, useEffect } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  width?: number | string;
  height?: number | string;
}

export default function SafeImage({
  fallbackSrc,
  onError,
  src: propSrc,
  alt,
  className,
  style,
  width,
  height,
  ...props
}: SafeImageProps) {
  const [errored, setErrored] = useState(false);
  const [src, setSrc] = useState(propSrc);

  useEffect(() => {
    setSrc(propSrc);
    setErrored(false);
  }, [propSrc]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!errored) {
      setErrored(true);
      if (fallbackSrc) {
        setSrc(fallbackSrc);
      }
    }
    onError?.(e);
  };

  if (errored && !fallbackSrc) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--gray-100)',
          color: 'var(--gray-400)',
          fontSize: '2.5rem',
          borderRadius: 'inherit',
        }}
      >
        🎨
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={typeof src === 'string' ? src : undefined}
      alt={alt || ''}
      className={className}
      style={{
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
        ...style,
      }}
      onError={handleError}
      loading="lazy"
      decoding="async"
    />
  );
}
