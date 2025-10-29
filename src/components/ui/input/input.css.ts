import styled from 'styled-components';

export const InputContainer = styled.div<{ err?: boolean }>`
  input {
    color: var(--font-color);
    border: 1px solid ${props => (props.err ? 'red' : ` var(--border-color)`)};
    font-size: 14px;

    &:focus {
      outline: none;
    }
  }
`;
