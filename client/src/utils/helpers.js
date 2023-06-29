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
                    <Form.Control type={field.type} name={field.name} defaultValue={field?.value?.length > 0 ? field.value : ''}/>
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
            const list = [];
            if(field?.value?.length > 0) {
                list.push(field.items.find((i) => i.value === field.value));
                const itemsRest = field.items.filter((e) => e.value !== field.value)
                itemsRest.map((i) => {
                    list.push(i)
                })
            } else {
                list.push({value: null, name: 'Please Select an Option'});
                field?.items?.map((l) => {
                    list.push(l)
                })
            }
            return (
                <>
                    <Form.Label>{field.title}</Form.Label>
                    <Form.Select className='mb-3' aria-label={field.name} name={field.name} defaultValue={field?.value?.length > 0 ?? field.value }>
                        {/* <option>Please Select an Option</option> */}
                        {/* <option value="Weekly">Weekly</option>
                        <option value="Bi-weekly">Bi-weekly</option>
                        <option value="Bi-monthly">Bi-monthly</option>
                        <option value="Monthly">Monthly</option> */}
                        {list?.map((i) => <option value={i.value}>{i.name}</option>)}
                    </Form.Select>
                </>
            )
        case 'date':
            return (
                <div className='date-div'>  
                    <label htmlFor='date' className='row form-label'>{field.title}</label>
                    <input id='date' type='date' name='date' className='row form-control' defaultValue={field?.value}></input>
                </div>
            )
    }
};

export function getDateArray() {
    const datesComing = [];
    const date = moment().format('D');
    const daysInMonth = moment().daysInMonth();
    if(parseInt(date) + 7 > daysInMonth) {
        for(let i = parseInt(date); i <= daysInMonth; i++) {
            datesComing.push(i)
        }
        const numLeft = 7 - datesComing.length;
        for(let i = 1; i <= numLeft; i++) {
            datesComing.push(i)
        }

        //handle end of the month stuff
    } else {
        //handle earlier in the month stuff
        for(let i = 0; i < 7; i++) {
            datesComing.push(parseInt(date) + i)
        }
    }
    return datesComing;
};

export function createArrayWithDate(list) {
    const date = moment().format('D');
    const month = moment().format('M');
    const year = moment().format('YYYY');

    const array = sortArrayByDay(list)

    return array?.map((e) => {
        if(parseInt(e.date) > date) {
            return {
                ...e,
                date: `${month}/${e.date}/${year}`
            }
        } else {
            return {
                ...e,
                date: `${parseInt(month) + 1}/${e.date}/${year}`,
            }
        } 
    })
}

export const sortArrayByDay = (array) => {
    array?.sort((a, b) => a.date - b.date);
    return array;
  };

export const sumUp = (array) => {
    const sum = array.reduce((acc, cur) => {
        return acc + cur;
    }, 0);
    return sum
};

export const nextPayDate = (pays, datesArr) => {
    switch(pays.consistency){
        case 'Weekly':
            return (
                //do something for weekly
                console.log('weekly')
            )
        case 'Bi-weekly':
            return (
                console.log('Bi-weekly')
            )
        case "Bi-monthly":
            return (
                console.log('Bi-Monthly')
            )
        case "Monthly":
            return (
                console.log('Monthly')
            )
    }
}