import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ACCOUNT } from '../utils/queries';
import { useStoreContext } from "../utils/GlobalState";
import Spinner from 'react-bootstrap/Spinner';
import { UPDATE_ACCOUNT } from '../utils/actions';
import Table from 'react-bootstrap/Table';
import { formatDate, getDateArray, createArrayWithDate, sumUp } from '../utils/helpers';
import accountNumbers from '../utils/congif';
import moment from 'moment';

export default function Home() {
    // const [ getAccount , { loading, error }] = useQuery(QUERY_ACCOUNT, {
    //     variables: { _id: localStorage.getItem('accountId')}
    // });
    const [upcomingBills, setUpcomingBills] = React.useState();
    const [upcomingPay, setUpcomingPay] = React.useState();
    const [remainingAmount, setRemainingAmount] = React.useState();
    const [remaningBudgets, setRemainingBudgets] = React.useState();
    const [state, dispatch] = useStoreContext();
    const { data, loading, error } = useQuery(QUERY_ACCOUNT, {
        variables: { _id: accountNumbers.an}
    });

    const handleSetUpcomingBills = () => {
        const datesComing = getDateArray();
        const weeklyBills = state?.account?.bills?.filter((bill) => datesComing.includes(parseInt(bill.date)));
        const finalBills = createArrayWithDate(weeklyBills);
        setUpcomingBills(() => finalBills)
    };

    const handleSetUpcomingPay = () => {
        const datesComing = getDateArray();
        
    }
    
    React.useEffect(() => {
        if(!!data) {
            dispatch({
                type: UPDATE_ACCOUNT,
                account: data.getAccount
            });
            handleSetUpcomingBills()
            handleSetUpcomingPay()
        }
    }, [data]);

    console.log(state);

    return (
        <div>
            {loading ? (
            <div>
                <Spinner animation='border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </Spinner>
            </div>
            ) : (
                <div className='container'>
                    <div className='mx-auto'><h3>7 Day Look Ahead</h3></div>
                    <hr />
                    <div className='row'>
                        <div className='col'>
                            Expected Balance
                        </div>
                        <div className='col'>${state?.account?.balance}</div>
                    </div>
                    <hr />
                    <div style={{ backgroundColor: 'red'}}> Non-Automated Bills coming Due</div>
                    <Table striped bordered hover size='sm'>
                        <tbody>
                            {upcomingBills?.filter((e) => !e.automated)?.map((bill) => (
                                <tr>
                                    <td>{bill.name}</td>
                                    <td>{bill.date}</td>
                                    <td>${bill.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div style={{ backgroundColor: 'yellow'}}>Automated Bills coming Due</div>
                    <Table striped bordered hover size='sm'>
                        <tbody>
                            {upcomingBills?.filter((e) => e.automated)?.map((bill) => (
                                <tr>
                                    <td>{bill.name}</td>
                                    <td>{bill.date}</td>
                                    <td>${bill.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <hr />
                    <div className='row'>
                        <div className='col'>
                            Balance After Bills
                        </div>
                        <div className='col'>${state?.account?.balance - sumUp(upcomingBills.map((b) => b.amount))}</div>
                    </div>
                    <hr />
                </div>
            )}
        </div>
    )
}