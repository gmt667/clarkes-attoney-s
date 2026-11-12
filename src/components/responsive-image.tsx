import type { ImgHTMLAttributes } from 'react';

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean; alt: string };

/** Native responsive images; no optimizer endpoint or server is needed. */
export function ResponsiveImage({ fill, priority, className = '', style, alt, ...props }: ImageProps) {
  return <img {...props} alt={alt} className={`${className}${fill ? ' responsive-image-fill' : ''}`}
    loading={priority ? 'eager' : props.loading ?? 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async"
    style={fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%', ...style } : style} />;
}
