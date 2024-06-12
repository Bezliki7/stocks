import styled from 'styled-components';

export const FieldsetContainer = styled.div`
  position: relative;
  display: flex;
  border-style: solid;
  border-radius: 1px;
  border-color: var(--border-color);
  border-width: 1px;
`;

export const Legend = styled.div`
  position: absolute;
  background-color: white;
  font-size: 13px;
  color: var(--font-color);
  margin-top: -10px;
  margin-left: 10px;
`;

export const Content = styled.div`
  padding: 10px 5px;
  width: 100%;
`;
