import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background-color: white;
  width: 40%;
  height: max-content;
  max-height: 100%;
  overflow-x: auto;
`;

export const ModalHeader = styled.div`
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: end;
  padding-right: 5px;

  button {
    color: red;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: end;
  padding: 3px 5px;
  align-items: end;

  button {
    border-radius: 0;
    margin-left: 5px;
  }
`;
