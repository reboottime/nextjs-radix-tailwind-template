import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Tooltip({
  children,
  explainer,
  open,
  defaultOpen,
  onOpenChange,
  intent,
  size,
  side = 'top',
  className,
  withArrow,
}: TooltipProps) {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root defaultOpen={defaultOpen} delayDuration={200} onOpenChange={onOpenChange} open={open}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className={twMerge(tooltipContent({ intent, size, className }))}
            side={side}
            sideOffset={5}
          >
            {explainer}
            {withArrow
              ? <RadixTooltip.Arrow className={twMerge(tooltipArrow({ intent, size, className }))} />
              : null}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

// eslint-disable-next-line import/namespace
export interface TooltipProps extends VariantProps<typeof tooltipContent>, RadixTooltip.TooltipProps {
  explainer: React.ReactElement | string
  children: React.ReactElement
  className?: string
  withArrow?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const tooltipContent = cva([], {
  variants: {
    intent: {
      primary: ['rounded-0.5md', 'bg-zinc-700', 'font-open-sans', 'text-white'],
    },
    size: {
      md: ['px-4', 'py-2.5', 'text-2xs'],
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
});

const tooltipArrow = cva([], {
  variants: {
    intent: {
      primary: ['fill-zinc-700'],
    },
    size: {
      md: ['w-4', 'h-2'],
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
});
