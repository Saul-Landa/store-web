import { useEffect, useState } from "react";
import NavMenu from "../menu/NavMenu";
import api from "../../util/api";
import moment from "moment";

const OrderTable = () => {
    const [orders, setOrders] = useState([])

    const getAll = () => {
        api.get('/orders/').then( ({ data }) => {
            setOrders(data);
        });
    }

   useEffect(() => { getAll() }, []);

    return(
        <div className="container">
            <NavMenu/>
            <div className="col-md-12 mt-4">
                <div className="row">
                    <h2 className="col-md-3">Orders</h2>
                </div>
            </div>
            <hr/>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Client</th>
                        <th>Date Created</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { orders.map((order, index) => (
                        <tr>
                            <th scope="row">{ index + 1 }</th>
                            <td>{ order?.clientFirstName + order?.clientLastName }</td>
                            <td>{ moment(order?.dateCreated).format('LLL')  }</td>
                            <td>{ order?.orderStatus?.name }</td>
                            <td>
                                { order?.orderStatus?.name === 'Pending' ? (<a href={ `/order/details/${order.id}` }>
                                    <i title="Show sale" className="fa fa-eye"></i>
                                </a>) : '' }
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}

export default OrderTable;