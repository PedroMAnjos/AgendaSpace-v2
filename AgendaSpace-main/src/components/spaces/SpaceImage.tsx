import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import { getAbsoluteImageUrl } from '@/lib/api';

export interface SpaceImageProps {
  src?: string | null;
  alt?: string;
  className?: string;
  containerClassName?: string;
  iconClassName?: string;
}

export function SpaceImage({
  src,
  alt = 'Espaço',
  className = 'w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-105',
  containerClassName = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 transition-transform duration-500 ease-out group-hover:scale-110',
  iconClassName = 'h-10 w-10 text-primary transition-transform duration-500 ease-out group-hover:scale-125',
}: SpaceImageProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const fullUrl = getAbsoluteImageUrl(src);

  if (!fullUrl || hasError) {
    return (
      <div className={containerClassName}>
        <Building2 className={iconClassName} />
      </div>
    );
  }

  return (
    <img
      src={fullUrl}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
