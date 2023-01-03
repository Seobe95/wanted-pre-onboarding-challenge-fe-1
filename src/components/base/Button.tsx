import styled, { css } from 'styled-components';

interface ButtonProps {
  children: string;
  fullWidth: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const StyledButton = styled.button<{ fullWidth: boolean }>`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: #eac9c1;
  &:hover {
    background: #d3ab9e;
  }

  &:disabled {
    background: #e3e3e3;
    color: white;
    cursor: not-allowed;
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
`;

const Button = ({
  children,
  disabled,
  fullWidth,
  className,
  type,
}: ButtonProps) => {
  return (
    <StyledButton
      disabled={disabled}
      fullWidth={fullWidth}
      className={className}
      type={type}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
