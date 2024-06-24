import { useEffect, useState } from "react";
import api from "../../util/api";
import NavMenu from "../menu/NavMenu";

const VehicleTable = () => {
    const [vehicles, setVehicles] = useState([])

    const getAll = () => {
        api.get('/vehicles/').then( ({ data }) => {
            setVehicles(data);
        });
    }

   useEffect(() => { getAll() }, []);

    return (
        <div className="container">
            <NavMenu/>
            <div className="col-md-12 mt-4">
                <div className="row">
                    <h2 className="col-md-3">Products</h2>
                    <div className="col-md-9">
                        <a href={ `/vechicle/create` } className="btn btn-success">New Product</a>
                    </div>
                </div>
            </div>
            <hr/>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Model</th>
                        <th>Color</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { vehicles.map((vehicle, index) => (
                        <tr>
                            <th scope="row">{ index + 1 }</th>
                            <td>{ vehicle?.model }</td>
                            <td>{ vehicle?.color }</td>
                            <td>{ vehicle?.description }</td>
                            <td>{ vehicle?.price }</td>
                            <td>
                                <a href={ `/order/create/` + vehicle?.id }>
                                    <i title="Create sale" className="fa fa-money"></i>
                                </a>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}

export default VehicleTable;