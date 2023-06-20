import moment from 'moment';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


export function formatDate(day) {
    const date = moment();
    const m = moment().format('M');
    const y = moment().format('YYYY');
    return `${m}/${day}/${y}`;
};

export function formFieldCreator(field) {
    const { type } = field;
    switch(type) {
        case 'text':
            return (
                <Form.Group className="mb-3" controlId={field.name} key={`${field.title}-key`}>
                    <Form.Label>{field.title}</Form.Label>
                    <Form.Control type={field.type} name={field.name}/>
                </Form.Group>
            )
        case 'number':
            return (
                <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control name={field.name} aria-label="Amount (to the nearest dollar)" />
                    <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
            )
        case 'checkbox':
            return (
                <Form.Check // prettier-ignore
                    name={field.name}
                    type={type}
                    id={`default-${field.type}`}
                    label={`default ${field.title}`}
                />
            )
    }
}