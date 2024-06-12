import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  user-select: none;
  height: 100%;
  width: 100%;
  color: var(--font-color);
  font-size: 14px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  column-gap: 5px;
  width: 100%;
`;

export const ChartsContainer = styled.div`
  display: flex;
`;

export const ListContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 20px;
  flex-direction: column;

  button {
    display: flex;
    justify-content: end;
  }
`;
