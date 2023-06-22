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
                    <Form.Control type={field.type} name={field.name} defaultValue={field?.value.length > 0 ? field.value : ''}/>
                </Form.Group>
            )
        case 'number':
            return (
                <>
                <Form.Label>{field.title}</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control name={field.name} aria-label="Amount" defaultValue={field?.value > 0 ? field.value : 0}/>
                    {/* <InputGroup.Text>.00</InputGroup.Text> */}
                </InputGroup>
                </>
            )
        case 'checkbox':
            return (
                <>
                    <Form.Check // prettier-ignore
                        name={field.name}
                        type={type}
                        id={`default-${field.type}`}
                        label={`${field.title}`}
                        defaultChecked={field.value}
                    />
                </>
            )
        case 'dropdown':
            return (
                <>
                    <Form.Label>{field.title}</Form.Label>
                    <Form.Select className='mb-3' aria-label={field.name} name={field.name} defaultValue={field.value.length > 0 ?? field.value }>
                        <option>Please Select a Pay Consistency</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Bi-weekly">Bi-weekly</option>
                        <option value="Bi-monthly">Bi-monthly</option>
                        <option value="Monthly">Monthly</option>
                    </Form.Select>
                </>
            )
    }
}