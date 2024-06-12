import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';

import { ModalContainer, ModalContent, ModalFooter, ModalHeader } from './modal.css';
import { Button } from '../ui';

import { ModalProps } from './modal.interface';

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  let node = document.querySelector('#modal');

  if (!node) {
    node = document.createElement('div');
    node.id = 'modal';
    document.body.appendChild(node);
  }

  return createPortal(children, node);
};

const Modal = ({ children, onClose, onSave }: ModalProps) => {
  return (
    <ModalPortal>
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <Button variant="ghost" onClick={onClose}>
              <FontAwesomeIcon icon={faX} size="sm" />
            </Button>
          </ModalHeader>
          {children}
          <ModalFooter>
            <Button variant="default" onClick={onClose}>
              Отмена
            </Button>
            <Button variant="default" onClick={onSave}>
              Сохранить
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </ModalPortal>
  );
};

export default Modal;
