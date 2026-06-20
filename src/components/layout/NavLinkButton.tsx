'use client';

import Link from 'next/link';
import type { VariantProps } from 'class-variance-authority';

import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants';

type NavLinkButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: VariantProps<typeof buttonVariants>['size'];
  className?: string;
  onClick?: () => void;
};

export function NavLinkButton({
  href,
  children,
  variant = 'navLink',
  size,
  className,
  onClick,
}: NavLinkButtonProps) {
  return (
    <Button
      nativeButton={false}
      variant={variant}
      size={size}
      className={className}
      render={<Link href={href} onClick={onClick} />}>
      {children}
    </Button>
  );
}
