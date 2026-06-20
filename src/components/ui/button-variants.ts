import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-clip-padding bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        outline:
          'bg-clip-padding border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-clip-padding bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'bg-clip-padding hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        /** Text links in nav/footer — color only, no hover fill */
        navLink:
          'bg-transparent hover:bg-transparent aria-expanded:bg-transparent dark:hover:bg-transparent',
        /** Footer primary nav links */
        footerLink:
          'bg-transparent text-brand-neutral-500 hover:bg-transparent hover:text-brand-blue dark:hover:bg-transparent',
        destructive:
          'bg-clip-padding bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'bg-clip-padding text-primary underline-offset-4 hover:underline',
        /** Navbar outline CTA + hero secondary CTA */
        marketingOutline:
          'bg-clip-border border-brand-neutral-300 bg-transparent text-brand-neutral-700 shadow-brand-sm hover:border-brand-blue hover:bg-brand-neutral-50',
        /** Solid brand primary — promos, heroes, FAQ, nav “Get App” */
        marketingPrimary:
          'border-0 bg-clip-border bg-brand-primary-600 text-white shadow-brand-xs hover:bg-brand-primary-700',
        /** White CTA on brand-primary bands */
        marketingInverse:
          'border-0 bg-white text-brand-primary-700 shadow-none hover:bg-blue-50',
        /** Outlined CTA on dark / gradient backgrounds */
        marketingOnDark:
          'border-1 border-white/90 bg-transparent text-white shadow-none hover:bg-white/10 hover:text-white',
        /** App store badge links — image only, no button chrome */
        storeBadge: 'h-auto w-fit bg-transparent p-0 shadow-none hover:bg-transparent',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
        /** Navbar desktop CTAs */
        'nav-cta':
          'h-9.5 gap-1.5 px-4 text-base font-semibold tracking-[-0.8px] rounded-lg',
        /** Compact marketing CTA (promo sections) */
        'marketing-sm':
          'h-auto w-auto gap-1.5 px-4.5 py-2.5 text-sm font-semibold leading-[110%] shadow-none',
        /** Standard marketing CTA (CTA bands) */
        'marketing-base':
          'h-auto gap-2 px-4.5 py-2.5 text-base font-semibold leading-[110%]',
        /** Hero CTAs */
        'marketing-md':
          'h-12 w-auto gap-2 px-4.5 py-2.5 text-base font-semibold leading-[110%] shadow-none',
        'marketing-md-wide':
          'h-12 w-auto gap-2 px-9.5 py-2.5 text-base font-semibold leading-[110%] shadow-none',
        /** Large centered CTA (FAQ support, etc.) */
        'marketing-lg':
          'h-auto w-fit gap-2 rounded-xl px-10 py-4 text-base font-semibold shadow-md',
        /** Contact form submit on gradient card */
        'form-submit': 'h-auto gap-2 rounded-[0.75rem] px-8 py-3 text-base font-semibold',
        pill: 'h-10 gap-1.5 rounded-full px-6 text-base font-semibold',
        'cta-mobile': 'w-full justify-center rounded-xl py-4 text-base font-bold',
      },
    },
    compoundVariants: [
      {
        variant: 'navLink',
        className: 'h-auto px-0 text-base font-medium',
      },
      {
        variant: 'footerLink',
        className: 'h-auto px-0',
      },
      {
        variant: ['marketingPrimary', 'marketingOutline'],
        size: ['marketing-sm', 'marketing-md', 'marketing-md-wide'],
        className: 'justify-center',
      },
      {
        variant: 'marketingInverse',
        size: 'marketing-base',
        className: 'w-full justify-center sm:w-auto',
      },
      {
        variant: 'marketingOnDark',
        size: 'marketing-base',
        className: 'justify-center',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
