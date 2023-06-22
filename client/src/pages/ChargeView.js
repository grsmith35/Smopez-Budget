import React from 'react';
import { useStoreContext } from '../utils/GlobalState';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useLazyQuery } from '@apollo/client';

export default function ChargeView() {
    const [state, dispath] = useStoreContext();

    const handleOpenModal = () => {

    }

    return (
        <>
            <h3>Charges</h3>
            {/* <div>
                <label htmlFor='startDate' className='row form-label'>Start Date</label>
                <input type='date' id='startDate' name='startDate' className='row form-control' />
            </div>
            <div>
                <label htmlFor='endDate' className='row form-label'>Start Date</label>
                <input type='date' id='endDate' name='endDate' className='row form-control' />
            </div> */}
             {/* <Form>
                <Row>
                    <Form.Control type='date' className='pl-3'/>
                </Row>
                <Row className='mx-3'>
                    <Form.Control type='date' className='mr-10'/>
                </Row> */}
            {/* </Form> */}
            <div>
                <Button variant="primary" onClick={handleOpenModal}>Search</Button>
            </div>
        </>
    )
};