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
        console.log('open modal')
        setAddBill(true)
    };

    const billsForm = [
        {
            title: "Bill Name",
            type: "text",
            name: "name",
        },
        {
            title: "Day of month Due",
            type: "text",
            name: 'date'
        },
        {
            title: "Source",
            type: "text",
            name: 'source'
        },
        {
            title: "Amount",
            type: "number",
            name: "amount"
        },{
            title: "Automated",
            type: "checkbox",
            name: "automated"
        }
    ];

    const handleCloseModal = () => {
        setAddBill(() => false)
    }

    const handleAddBill = (formState) => {
        console.log(formState)
        addNewBill({
            variables: { _id: localStorage.getItem('accountId'), name: 'Mortgage', date: '1', source: 'SWBC', amount: 3000, automated: true}
        })
    };

    React.useEffect(() => {
        setTotalBills(() => bills.reduce((acc, obj) => { return acc + obj.amount; }, 0));
    }, []);

    console.log(addBill)

    return (
        <>
            {addBill && (
                <ModalForm
                title={'Add Bill'}
                fields={billsForm}
                submitFunction={handleAddBill}
                closeDialog={handleCloseModal}
                />
            )}
            <h3>Bills</h3>
            {!state?.account?.bills?.lenght && (
                <div>Add Your First Bill</div>
            )}
            <div>
                <Button variant="primary" onClick={handleOpenModal}>Add Bill</Button>
            </div>
            {!!state?.account?.bills?.length && (bills.map((bill) => (
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