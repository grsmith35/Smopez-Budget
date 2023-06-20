import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { formFieldCreator } from "../utils/helpers";

export default function ModalForm({title, fields, editFields, closeDialog, submitFunction}) {

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        const index = fields.map((field) => field.name).indexOf(name);
        const newField = fields[index];
        newField.value = value;
        const newArray = fields;
        newArray[index] = newField
        editFields(newArray);
    }

    return (
        <Modal show={true} onHide={closeDialog}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onChange={handleFormChange}>
                    {fields.map((field) => (
                        // <Form.Group className="mb-3" controlId={field.name} key={`${field.title}-key`}>
                        //     <Form.Label>{field.title}</Form.Label>
                        //     <Form.Control type={field.type} name={field.name}/>
                        // </Form.Group>
                        formFieldCreator(field)
                    ))}
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>Close</Button>
                    <Button variant="primary" onClick={submitFunction}>Save</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    )
}