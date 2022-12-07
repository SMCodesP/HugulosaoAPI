import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { DefaultStyledButton } from './styles';

interface TDefaultButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text?: string;
  color?: string;
}

const DefaultButton: React.FC<TDefaultButton> = ({
  text,
  color,
  children,
  ...props
}) => {
  return (
    <DefaultStyledButton color={color} {...(props as any)}>
      {text || children}
    </DefaultStyledButton>
  );
};

export default DefaultButton;
