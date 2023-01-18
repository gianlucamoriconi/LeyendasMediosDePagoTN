import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineQuestionCircle } from 'react-icons/ai';


const ModalCustom = ({buttonText, title, body, question}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        {question === true ? <AiOutlineQuestionCircle style={{ height: 18, width: 18, marginRight: 5}}></AiOutlineQuestionCircle> : null}
        <a href="#how-to-use" className='button-modal-open' onClick={handleShow}>
        {buttonText}
        </a>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
            Cerrar
            </Button>
        </Modal.Footer>
        </Modal>
    </>
  );
}

export default ModalCustom;