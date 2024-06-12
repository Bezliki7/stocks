import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  user-select: none;
  height: 100%;
  width: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  column-gap: 5px;
  width: 100%;
`;

export const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;

  .ant-picker .ant-picker-input > input {
    color: var(--font-color) !important;
  }
`;
