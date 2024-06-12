import styled from 'styled-components';

export const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  color: var(--font-color);

  input {
    height: 2em;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 4px;
  }
`;
