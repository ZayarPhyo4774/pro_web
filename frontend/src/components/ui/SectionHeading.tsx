import { cn } from '../../lib/utils';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <p className="text-xs uppercase tracking-[0.4em] text-gold/80">{eyebrow}</p>
      <h2 className="font-display mt-5 text-balance text-4xl leading-[1.1] tracking-tight text-offwhite sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 text-lg leading-8 text-muted">{description}</p>
      ) : null}
    </div>
  );
}
