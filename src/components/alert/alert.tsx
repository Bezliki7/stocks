import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';

import { Button } from '../ui';
import { AlertContainer, ModalContent, ModalFooter, ModalHeader, Title } from './alert.css';

import { AlertProps } from './alert.interface';

const AlertPortal = ({ children }: { children: React.ReactNode }) => {
  let node = document.querySelector('alert');

  if (!node) {
    node = document.createElement('div');
    node.id = 'alert';
    document.body.appendChild(node);
  }

  return createPortal(children, node);
};

const Alert = ({ children, onClose, title }: AlertProps) => {
  return (
    <AlertPortal>
      <AlertContainer>
        <ModalContent>
          <ModalHeader>
            <Title>{title}</Title>
            <Button variant="ghost" onClick={onClose}>
              <FontAwesomeIcon icon={faX} size="sm" />
            </Button>
          </ModalHeader>
          {children}
          <ModalFooter>
            <Button variant="default" onClick={onClose}>
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </AlertContainer>
    </AlertPortal>
  );
};

export default Alert;
