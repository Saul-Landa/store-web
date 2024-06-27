import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../menu/NavMenu";
import { useEffect, useState } from "react";
import api from "../../util/api";
import { toast } from "react-toastify";

const OrderDetails = () => {
    const [model, setModel] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [clientFirstName, setClientFirstName] = useState("");
    const [clientLastName, setClientLastName] = useState("");
    const [status, setStatus] = useState(0);
    const [loading, setLoading] = useState(true);
    const [statusList, setStatusList] = useState([])
    const navigate = useNavigate();

    const params = useParams();

    const showErrorMessage = message => {
        toast.error(message, { 
          position: "top-right",
        });
    }

    const showSuccessMessage = message => {
        toast.success(message, { 
          position: "top-right",
        });
    }

    const getOrderDetails = () => {
        api.get(`/orders/details/${params?.id}`).then( ({ data }) => {
            setModel(data.vehicle.model);
            setDescription(data.vehicle.description);
            setPrice(data.vehicle.price);
            setClientFirstName(data.order.clientFirstName);
            setClientLastName(data.order.clientLastName);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            showErrorMessage('Something is wrong');
        })
    }

    const getStatus = () => {
        api.get('/orders/status').then( ({ data }) => {
            setStatusList(data);
            setLoading(false);
        });
    }

    const changeStatus = () => {
        const orderStatus = statusList.find( x => x.id == status );
        if ( !orderStatus ) {
            showErrorMessage("Select a status to continue.");
            return
        }
        if ( orderStatus?.name == "Pending" ) {
            showErrorMessage("You can't change to pending.");
            return
        }
        api.put(`/orders/status/${params?.id}`, orderStatus).then(response => {
            if ( !response.data?.id ) {
                showErrorMessage("You can't cancel because more than 30 seconds have elapsed.");
                return
            }

            showSuccessMessage("Status changed.")
            return navigate(`/orders`);
        }).catch(error => {
            console.log(error)
        });
    }

    useEffect(() => { getOrderDetails() }, [])
    useEffect(() => { getStatus() }, [])

    if ( loading ) {
        return ( <div></div> )
    }

    return (
        <div className="container">
            <NavMenu/>
            <section className="mt-4">
                <div className="row">
                    <h2>Change Status</h2>
                    <hr />
                    <div className="form-group col-md-4 mb-3">
                        <label className="form-label">Model</label>
                        <input type="text" className="form-control" value={ model } disabled/>
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label className="form-label">Description</label>
                        <input type="text" className="form-control" value={ description } disabled/>
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label className="form-label" htmlFor="price">Price</label>
                        <input type="number" className="form-control" value={ price } disabled/>
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label className="form-label" htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" value={ clientFirstName } disabled/>
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label className="form-label" htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" value={ clientLastName } disabled/>
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label className="form-label" htmlFor="status">Status</label>
                        <select className="form-control" onChange={ e => setStatus(e.target.value) }>
                            <option value="0" disabled>Select a status</option>
                            { statusList.map(status => (
                                <option value={ status.id }>{ status.name }</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-1">
                        <a href={ `/orders` } className="btn btn-outline-danger">Cancel</a>
                        <button className="btn btn-success ms-2"
                        onClick={ changeStatus }>Save</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default OrderDetails;