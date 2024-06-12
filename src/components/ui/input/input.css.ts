import styled from 'styled-components';

export const InputContainer = styled.div`
  input {
    color: var(--font-color);
    border: 1px solid var(--border-color);
    font-size: 14px;

    &:focus {
      outline: none;
    }
  }
`;
