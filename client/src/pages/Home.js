import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ACCOUNT } from '../utils/queries';
import { useStoreContext } from "../utils/GlobalState";
import Spinner from 'react-bootstrap/Spinner';
import { UPDATE_ACCOUNT } from '../utils/actions';
import Table from 'react-bootstrap/Table';
import { formatDate } from '../utils/helpers';

export default function Home() {
    // const [ getAccount , { loading, error }] = useQuery(QUERY_ACCOUNT, {
    //     variables: { _id: localStorage.getItem('accountId')}
    // });
    const [state, dispatch] = useStoreContext();
    const { data, loading, error } = useQuery(QUERY_ACCOUNT, {
        variables: { _id: '64820142c23f76f4c1519092'}
    });

    
    React.useEffect(() => {
        if(!!data) {
            dispatch({
                type: UPDATE_ACCOUNT,
                account: data.getAccount
            })
        }
    }, [data]);

    console.log(state)

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
                        <div className='col'>${state.account.balance}</div>
                    </div>
                    <hr />
                    <div style={{ backgroundColor: 'red'}}> Non-Automated Bills coming Due</div>
                    <Table striped bordered hover size='sm'>
                        <tbody>
                            {state?.account?.bills?.filter((e) => !e.automated)?.map((bill) => (
                                <tr>
                                    <td>{bill.name}</td>
                                    <td>{formatDate(bill.date)}</td>
                                    <td>${bill.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    )
}