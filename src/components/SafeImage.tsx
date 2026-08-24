'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface SafeImageProps extends ImageProps {
  fallbackSrc?: string;
}

export default function SafeImage({ fallbackSrc, onError, ...props }: SafeImageProps) {
  const [errored, setErrored] = useState(false);
  const [src, setSrc] = useState(props.src);

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
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--gray-100)',
        color: 'var(--gray-400)',
        fontSize: '2rem',
      }}>
        🎨
      </div>
    );
  }

  return <Image {...props} src={src} onError={handleError} />;
}
