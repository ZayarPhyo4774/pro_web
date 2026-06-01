import Link from 'next/link';
import { cn } from '../../lib/utils';

type ButtonProps = {
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary:
    'bg-gold text-primary hover:brightness-110 shadow-glow-gold',
  outline:
    'border border-gold/60 bg-transparent text-gold hover:bg-gold/10',
  ghost: 'text-offwhite/80 hover:text-gold',
};

export default function Button({
  href,
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full px-8 py-4 text-xs uppercase tracking-[0.3em] transition duration-500 ease-luxury',
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
