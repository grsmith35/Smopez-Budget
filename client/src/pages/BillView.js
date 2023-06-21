import React from "react";
import { useStoreContext } from "../utils/GlobalState";
import Button from 'react-bootstrap/Button';
import ModalForm from "../Components/ModalForm";
import { useMutation } from "@apollo/client";
import { ADD_BILL, DELETE_BILL } from "../utils/mutations";
import { UPDATE_ACCOUNT_BILLS } from "../utils/actions";

export default function BillView() {
    const [totalBills, setTotalBills] = React.useState(0);
    const [state, dispatch] = useStoreContext();
    const [addBill, setAddBill] = React.useState(false);
    const [addNewBill] = useMutation(ADD_BILL);
    const [billAdded, setBillAdded] = React.useState();
    const [deleteBill] = useMutation(DELETE_BILL);
    const [billRemoved, setBillRemoved] = React.useState();
    
    const handleEditBill = (e) => {
        console.log(e.target.id);
        const billToEdit = state?.account?.bills?.filter((bill) => bill._id === e.target.id)
        setBillsForm([
            {
                title: "Bill Name",
                type: "text",
                name: "name",
                value: billToEdit.name,
                defaultValue: billToEdit.name
            },
            {
                title: "Day of month Due",
                type: "text",
                name: 'date',
                value: billToEdit.date,
                defaultValue: billToEdit.date
            },
            {
                title: "Source",
                type: "text",
                name: 'source',
                value: billToEdit.source,
                defaultValue: billToEdit.source
            },
            {
                title: "Amount",
                type: "number",
                name: "amount",
                value: billToEdit.amount,
                defaultValue: billToEdit.amount
            },{
                title: "Automated",
                type: "checkbox",
                name: "automated",
                value: billToEdit.automated,
                defaultValue: billToEdit.automated
            }
        ])
        setAddBill(true);
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

    const handleCloseModal = (e) => {
        setAddBill(() => false)
    }

    const handleDeleteBill = async (e) => {
        const removedBill = await deleteBill({
            variables: { _id: `${e.target.id}`, accountId: "648f80ba56057c890b970041"}
        })
        if(!!removedBill) {
            setBillRemoved(e.target.id)
        }
    }

    const handleAddBill = async () => {
        const data = await addNewBill({
            variables: { _id: "648f80ba56057c890b970041", name: billsForm[0].value, date: billsForm[1].value, source: billsForm[2].value, amount: parseFloat(billsForm[3].value), automated: billsForm[4].value === 'on' ? true : false}
        })
        //todotodo update the store
        if(!!data) {
            setBillAdded(data.data.addBill);
            setAddBill(false);
        }
    };

    React.useEffect(() => {
        setTotalBills(() => state?.account?.bills?.reduce((acc, obj) => { return acc + obj.amount; }, 0));
    }, []);

    React.useEffect(() => {
        if(!!billAdded) {
            const allBills = [
                ...state?.account?.bills,
                billAdded
            ];
            dispatch({
                type: UPDATE_ACCOUNT_BILLS,
                bills: allBills
            })
        }
    }, [billAdded]);

    React.useEffect(() => {
        if(!!billRemoved) {
            const allBills = state?.account?.bills?.filter((bill) => bill._id != billRemoved);
            dispatch({
                type: UPDATE_ACCOUNT_BILLS,
                bills: allBills
            })
        }
    }, [billRemoved])

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
                        <div className="card m-3" key={bill._id} id={bill._id} onClick={handleEditBill}>
                            <div className="card-title"><h3>{bill.name}</h3></div>
                            <hr />
                            <div className="card-text"><strong>Date:</strong> {bill.date}</div>
                            <div className="card-text"><strong>Amount:</strong> {bill.amount}</div>
                            <div className="card-text"><strong>Consistency:</strong> {bill.consistency}</div>
                            <div className="card-text"><strong>Day:</strong> {bill.day}</div>
                            <Button variant="primary" id={bill._id} onClick={handleEditBill}>Edit Bill</Button>
                            <Button variant="danger" id={bill._id} onClick={handleDeleteBill}>Delete Bill</Button>
                        </div>
                    )))}
        </>
    )
};