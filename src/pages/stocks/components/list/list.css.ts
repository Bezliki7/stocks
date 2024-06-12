import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  row-gap: 3px;
  border-radius: 10%;
  padding: 5px;
`;

export const Item = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: #eaeaea;
  padding: 0px 3px;
  height: 20px;
  border-radius: 1px;
  border: ${(props) => (props.selected ? '1px solid #a0a0a0;' : '')};

  &:hover {
    background-color: #e1e0e0;
  }
`;
