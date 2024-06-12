import styled from 'styled-components';

export const PredictionContainer = styled.div`
  display: flex;
  column-gap: 5px;

  button {
    border-radius: 1px;
  }
`;

export const StocksContainer = styled.div`
  display: flex;
  padding: 5px;
  flex-wrap: wrap;
  flex-direction: column !important;
  color: #676a6c;
  width: 450px;
  row-gap: 5px;

  span {
    padding: 5px;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 42px;
  padding-right: 5px;

  img {
    height: 24px;
  }
`;

export const PredictionRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;
