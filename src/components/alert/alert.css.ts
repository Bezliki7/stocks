import styled from 'styled-components';

export const AlertContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  user-select: none;
`;

export const ModalContent = styled.div`
  background-color: white;
  height: max-content;
  max-height: 100%;
`;

export const Title = styled.div`
  color: var(--font-color);
`;

export const ModalHeader = styled.div`
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  padding: 0px 5px;

  button {
    color: red;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: end;
  padding: 3px 5px;
  align-items: end;

  button {
    border-radius: 0;
    margin-left: 5px;
  }
`;
