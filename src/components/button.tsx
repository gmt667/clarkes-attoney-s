import { Link, type LinkProps } from 'react-router-dom';

export function Button({ variant = 'solid', className = '', ...props }: LinkProps & { variant?: 'solid' | 'ghost' }) {
  return <Link {...props} className={`button button-${variant} ${className}`} />;
}
