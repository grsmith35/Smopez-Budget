import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//title, fields, submitFunction, closeDialog

export default function ModalForm({title, fields, submitFunction, closeDialog}) {
    const [formState, setFormState] = React.useState({});
    const handleFormChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        })
        console.log(formState)
    }

    console.log('trying to render')

    return (
        <Modal show={true} onHide={closeDialog}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onChange={handleFormChange} >
                    {fields.map((field) => (
                        <Form.Group classNameName="mb-3" controlId={field.name} key={`${field.title}-key`}>
                            <Form.Label>{field.title}</Form.Label>
                            <Form.Control type={field.type} name={field.name} />
                        </Form.Group>
                    ))}
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog()}>Close</Button>
                    <Button variant="primary" onClick={submitFunction(formState)}>Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
//         <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div className="modal-dialog">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
//         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div className="modal-body">
//         ...
//       </div>
//       <div className="modal-footer">
//         <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//         <button type="button" className="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>

    )
}