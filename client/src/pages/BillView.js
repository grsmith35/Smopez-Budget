import React from "react";

export default function BillView() {
    const [totalBills, setTotalBills] = React.useState(0);
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

    React.useEffect(() => {
        setTotalBills(() => bills.reduce((acc, obj) => { return acc + obj.amount; }, 0));
    }, [])

    return (
        <>
            <h3>Bills</h3>
            
            {bills.map((bill) => (
                        <div className="card m-3" key={bill.name} id={bill.name} onClick={handleEditBill}>
                            <div className="card-title"><h3>{bill.name}</h3></div>
                            <hr />
                            <div className="card-text"><strong>Date:</strong> {bill.date}</div>
                            <div className="card-text"><strong>Amount:</strong> {bill.amount}</div>
                            <div className="card-text"><strong>Consistency:</strong> {bill.consistency}</div>
                            <div className="card-text"><strong>Day:</strong> {bill.day}</div>
                        </div>
                    ))}
        </>
    )
};