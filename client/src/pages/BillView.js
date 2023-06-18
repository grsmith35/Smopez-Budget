import React from "react";
import { useStoreContext } from "../utils/GlobalState";
import Button from 'react-bootstrap/Button';
import ModalForm from "../Components/ModalForm";
import { useMutation } from "@apollo/client";
import { ADD_BILL } from "../utils/mutations";

export default function BillView() {
    const [totalBills, setTotalBills] = React.useState(0);
    const [state, dispatch] = useStoreContext();
    const [addBill, setAddBill] = React.useState(false);
    const [addNewBill, { error }] = useMutation(ADD_BILL);

    console.log(state)


    const bills = [
        {
            name: "Mortgage",
            amount: 3000,
            date: 1,
            consistency: 'month',
            source: 'SWBC',
            Automated: true
        },
        {
            name: "Taz's Car",
            amount: 300,
            date: 1,
            consistency: 'month',
            source: 'America First',
            Automated: true
        },
        {
            name: "Credit Card(chase)",
            amount: 100,
            date: 4,
            consistency: 'month',
            source: 'Chase',
            Automated: false
        },
    ];
    
    const handleEditBill = (e) => {
        console.log(e.target)
    }

    const handleOpenModal = () => {
        setAddBill(true)
    };

    const [billsForm, setBillsForm] = React.useState([
        {
            title: "Bill Name",
            type: "text",
            name: "name",
            value: ""
        },
        {
            title: "Day of month Due",
            type: "text",
            name: 'date',
            value: ""
        },
        {
            title: "Source",
            type: "text",
            name: 'source',
            value: ""
        },
        {
            title: "Amount",
            type: "number",
            name: "amount",
            value: "0"
        },{
            title: "Automated",
            type: "checkbox",
            name: "automated",
            value: false
        }
    ]);

    const handleCloseModal = () => {
        setAddBill(() => false)
    }

    const handleAddBill = async () => {
        const data = addNewBill({
            variables: { _id: "648f80ba56057c890b970041", name: billsForm[0].value, date: billsForm[1].value, source: billsForm[2].value, amount: parseFloat(billsForm[3].value), automated: billsForm[4].value}
        })
        //todotodo update the store
        console.log(data)
    };

    React.useEffect(() => {
        setTotalBills(() => bills.reduce((acc, obj) => { return acc + obj.amount; }, 0));
    }, []);

    return (
        <>
            {addBill && (
                <ModalForm
                    title={'Add Bill'}
                    fields={billsForm}
                    editFields={setBillsForm}
                    submitFunction={handleAddBill}
                    closeDialog={handleCloseModal}
                />
            )}
            <h3>Bills</h3>
            {state?.account?.bills?.lenght === 0 && (
                <div>Add Your First Bill</div>
            )}
            <div>
                <Button variant="primary" onClick={handleOpenModal}>Add Bill</Button>
            </div>
            {!!state?.account?.bills?.length && (state?.account?.bills?.map((bill) => (
                        <div className="card m-3" key={bill.name} id={bill.name} onClick={handleEditBill}>
                            <div className="card-title"><h3>{bill.name}</h3></div>
                            <hr />
                            <div className="card-text"><strong>Date:</strong> {bill.date}</div>
                            <div className="card-text"><strong>Amount:</strong> {bill.amount}</div>
                            <div className="card-text"><strong>Consistency:</strong> {bill.consistency}</div>
                            <div className="card-text"><strong>Day:</strong> {bill.day}</div>
                        </div>
                    )))}
        </>
    )
};