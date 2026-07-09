import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { EssentialIcon } from '@/shared/components/icons';

type FormLabelVariant = 'section' | 'field';

interface FormLabelBaseProps {
  children: ReactNode;
  className?: string;
  required?: boolean;
  variant?: FormLabelVariant;
}

export type FormLabelProps =
  | (FormLabelBaseProps &
      Omit<ComponentPropsWithoutRef<'label'>, keyof FormLabelBaseProps> & {
        as?: 'label';
      })
  | (FormLabelBaseProps &
      Omit<ComponentPropsWithoutRef<'h2'>, keyof FormLabelBaseProps> & {
        as: 'h2';
      })
  | (FormLabelBaseProps &
      Omit<ComponentPropsWithoutRef<'p'>, keyof FormLabelBaseProps> & {
        as: 'p';
      });

const VARIANT_CLASS_NAMES = {
  section: {
    icon: 'mt-0.75',
    text: 'text-body-sb-15 text-gray-800',
  },
  field: {
    icon: '',
    text: 'text-body-r-14 text-gray-500',
  },
} satisfies Record<FormLabelVariant, { icon: string; text: string }>;

const getFormLabelContent = (
  children: ReactNode,
  required: boolean,
  iconClassName: string,
) => {
  return (
    <>
      {children}
      {required && (
        <EssentialIcon
          aria-hidden="true"
          className={cn('text-error size-1.5 shrink-0', iconClassName)}
        />
      )}
    </>
  );
};

export const FormLabel = (props: FormLabelProps) => {
  const {
    as,
    children,
    className,
    required = false,
    variant = 'section',
  } = props;
  const variantClassNames = VARIANT_CLASS_NAMES[variant];
  const labelClassName = cn(
    'flex items-start gap-0.5',
    variantClassNames.text,
    className,
  );
  const content = getFormLabelContent(
    children,
    required,
    variantClassNames.icon,
  );

  if (as === 'h2') {
    const {
      as: _as,
      children: _children,
      className: _className,
      required: _required,
      variant: _variant,
      ...headingProps
    } = props;

    return (
      <h2 className={labelClassName} {...headingProps}>
        {content}
      </h2>
    );
  }

  if (as === 'p') {
    const {
      as: _as,
      children: _children,
      className: _className,
      required: _required,
      variant: _variant,
      ...paragraphProps
    } = props;

    return (
      <p className={labelClassName} {...paragraphProps}>
        {content}
      </p>
    );
  }

  const {
    as: _as,
    children: _children,
    className: _className,
    required: _required,
    variant: _variant,
    ...labelProps
  } = props;

  return (
    <label className={labelClassName} {...labelProps}>
      {content}
    </label>
  );
};
