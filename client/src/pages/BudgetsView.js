import React from "react";

export default function BudgetsView() {
    const [totalBudgets, setTotalBudgets] = React.useState(0);
    const budgets = [
        {
            name: "Groceries",
            amount: 200,
            consistency: 'weekly',
            payments: [
                {
                    date: "1/1/2023",
                    location: 'smiths',
                    amount: 100,
                }
            ]
        },
        {
            name: "Gas",
            amount: 200,
            consistency: 'month',
            payments: [
                {
                    date: "1/1/2023",
                    location: 'chevron',
                    amount: 56.56,
                }
            ]
        },
    ];
    
    const handleEditBudget = (e) => {
        console.log(e.target)
    }

    // React.useEffect(() => {
    // }, [])

    return (
        <>
            <h3>Budgets</h3>
            
            {budgets.map((budget) => (
                        <div className="card m-3" key={budget.name} id={budget.name} onClick={handleEditBudget}>
                            <div className="card-title"><h3>{budget.name}</h3></div>
                            <hr />
                            <div className="card-text"><strong>Amount:</strong> {budget.amount}</div>
                            <div className="card-text"><strong>Consistency:</strong> {budget.consistency}</div>
                            <div className="card-text"><strong>Payments</strong>
                            </div>
                            <hr />
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {budget.payments.map((payment) => (
                                        <tr>
                                            <td>{payment.date}</td>
                                            <td>{payment.location}</td>
                                            <td>{payment.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <hr />
                            <div className="card-text">Remaining Amount: 100</div>
                        </div>
                    ))}
        </>
    )
};