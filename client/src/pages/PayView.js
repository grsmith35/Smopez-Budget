import React from "react";
import { useStoreContext } from "../utils/GlobalState";
import ModalForm from "../Components/ModalForm";
import Button from 'react-bootstrap/Button';
import { useMutation } from "@apollo/client";
import { ADD_PAY } from "../utils/mutations";

export default function PayView() {
    const [addPay, setAddPay] = React.useState(false);
    const [state, dispatch] = useStoreContext();
    const [addNewPay, {error}] = useMutation(ADD_PAY)

    const paySources = [
        {
            name: "Taz's Salary",
            amount: 1500,
            date: null,
            consistency: 14,
            day: 'Wednesday',
        },
        {
            name: "Riley's Salary",
            amount: 1500,
            date: [15,30],
            consistency: null,
            day: null,
        },
        {
            name: "Basement Rent",
            amount: 100,
            date: [1],
            consistency: null,
            day: null,
        },
    ];
    
    const handleEditPay = (e) => {
        console.log(e.target)
    }

    const handleOpenModal = () => {
        setAddPay(true)
    }

    return (
        <>
            <h3>Pay Sources</h3>
            {state?.account?.pay?.length === 0 && (
                <div>Add your First Pay Source</div>
            )}
            <div>
                <Button variant="primary" onClick={handleOpenModal}>Add Pay</Button>
            </div>
            {!!state?.account?.pay?.length && (state?.account?.pay?.map((pay) => (
                        <div className="card m-3" key={pay.name} id={pay.name} onClick={handleEditPay}>
                            <div className="card-title"><h3>{pay.name}</h3></div>
                            <hr />
                            <div className="card-text">Date: {pay.date}</div>
                            <div className="card-text">Amount: {pay.amount}</div>
                            <div className="card-text">Consistency: {pay.consistency}</div>
                            <div className="card-text">Day: {pay.day}</div>
                        </div>
                    )))}
        </>
    )
};