import React from "react";

export default function PayView() {
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

    return (
        <>
            <h3>Pay Sources</h3>
            
            {paySources.map((pay) => (
                        <div className="card m-3" key={pay.name} id={pay.name} onClick={handleEditPay}>
                            <div className="card-title"><h3>{pay.name}</h3></div>
                            <hr />
                            <div className="card-text">Date: {pay.date}</div>
                            <div className="card-text">Amount: {pay.amount}</div>
                            <div className="card-text">Consistency: {pay.consistency}</div>
                            <div className="card-text">Day: {pay.day}</div>
                        </div>
                    ))}
        </>
    )
};