import { Button as ButtonPrimitive } from '@base-ui/react/button';
import type { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

function Button({
  className,
  variant = 'default',
  size = 'default',
  render,
  nativeButton,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  const isCustomRender = render !== undefined;

  return (
    <ButtonPrimitive
      data-slot="button"
      nativeButton={nativeButton ?? !isCustomRender}
      className={cn(buttonVariants({ variant, size }), className)}
      render={render}
      {...props}
    />
  );
}

export { Button };
