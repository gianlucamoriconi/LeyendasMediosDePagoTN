import { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { createReport } from '../../firebase/reportFunctions';
import Spinner from 'react-bootstrap/Spinner';


const ModalCustom = ({body, question, buttonClasses, buttonText, successPage, failAction, totalSelection}) => {
    const [show, setShow] = useState(false);
    const [spinnerSubmit, setSpinnerSubmit] = useState({
        text: "Enviar",
        disabled: false
    });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const goToCode = useCallback(() => navigate(successPage , {replace: true}), [navigate]);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        if (form.checkValidity() === true) {
            event.preventDefault();
            event.stopPropagation();
            
            setSpinnerSubmit({
                text: "Enviando...",
                disabled: true
            });

            let date = new Date();
            let currentDate = date.toISOString();

            //Obtener los valores del form:
            const storeId = document.getElementById("store-id").value;
            const githubId = document.getElementById("github-id").value;
            const githubType = document.getElementById("issue-radio").checked ? "issue" : document.getElementById("problem-radio").checked ? "problem" : null;
            
            const report = {
                storeId: Number(storeId),
                githubId: Number(githubId),
                type: githubType,
                date: currentDate,
                totalSelection: totalSelection

            };

            console.log(report);

            const successAction = () => {
                setSpinnerSubmit({
                    text: "¡Gracias!",
                    disabled: false
                });
                goToCode();
            };

            const failAction = () => {
                setSpinnerSubmit({
                    text: "Hubo un problema :(",
                    disabled: false
                });
                console.log("Falló!");

            };

            createReport(report, successAction, failAction);
            
        }
    
        setValidated(true);

    };

    return (
    <>
        {question === true ? <AiOutlineQuestionCircle style={{ height: 18, width: 18, marginRight: 5}}></AiOutlineQuestionCircle> : null}
        <button className={buttonClasses} onClick={handleShow}>
        {buttonText}
        </button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Reporta el motivo de cambio</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
            {body}
            
            <Form.Group className="mb-4" controlId="store-id">
                <Form.Label className="fw-bold fs-7">Store ID</Form.Label>
                <Form.Control
                type="number"
                placeholder="Ej: 4432"
                autoFocus
                required
                />
            </Form.Group>
            <Form.Group className="mb-4" controlId="github-id">
                <Form.Label className="fw-bold fs-7">Github ID</Form.Label>
                <Form.Control
                type="number"
                placeholder="Ej: 1672893"
                autoFocus
                required
                />
            </Form.Group>
            <Form.Group className="mb-4" controlId="github-type" required>
                <Form.Label className="fw-bold fs-7">¿Es un Problem o  un Issue?</Form.Label>
                <div>
                    <Form.Check
                        inline
                        label="Problem"
                        name="group1"
                        type="radio"
                        id="problem-radio"
                        required
                    />
                    <Form.Check
                        inline
                        label="Issue"
                        name="group1"
                        type="radio"
                        id="issue-radio"
                        required
                    />
                </div>

            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="comments"
            >
                <Form.Label className="fw-bold fs-7">Deja un comentario (opcional)</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            
        </Modal.Body>
        <Modal.Footer>
            <Button type="submit" disabled={spinnerSubmit.disabled ? 'disabled' : false}>
            {spinnerSubmit.text}
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className={`ms-2 ${spinnerSubmit.disabled ? '' : 'd-none'}`}
            />
            </Button>
        </Modal.Footer>
        </Form>
        </Modal>
    </>
    );
}

export default ModalCustom;