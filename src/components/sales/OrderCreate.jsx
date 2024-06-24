import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../menu/NavMenu";
import { useEffect, useState } from "react";
import api from "../../util/api";
import { toast } from "react-toastify";

const OrderCreate = () => {
    const [clientFirstName, setFirstName] = useState("")
    const [clientLastName, setLastName] = useState("")
    const [model, setModel] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [vehicleId, setVehicleId] = useState("")
    const [loading, setLoading] = useState(true);
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

    const getVehicle = () => {
        api.get('/vehicles/' + params?.id).then( ({ data }) => {
            setModel(data?.model);
            setDescription(data?.description);
            setPrice(data?.price);
            setVehicleId(data?.id);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            showErrorMessage('Something is wrong');
        })
    }

    const saveOrder = () => {
        const id = localStorage.getItem("id");
        api.post(`/orders/${ vehicleId }`, { clientFirstName, clientLastName, salesPerson: { id } }).then( response => {
            if ( response?.data?.id ) {
                showSuccessMessage('Order created.')
                return navigate(`/orders`);
            }
            showErrorMessage("Something is wrong");
        }).catch(error => {
            showErrorMessage('Something is wrong');
        })
    }

    useEffect(() => { getVehicle() }, [])

    if ( loading ) {
        return ( <div></div> )
    }

    return(
        <div className="container">
            <NavMenu/>
            <section className="mt-4">
                <div className="row">
                    <h2>New Sale</h2>
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
                        <input type="text" className="form-control" name="firstName" id="firstName"
                        onChange={ e => setFirstName(e.target.value) }/>
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label className="form-label" htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" id="lastName"
                        onChange={ e => setLastName(e.target.value) }/>
                    </div>
                    <div className="mt-1">
                        <a href={ `/vehicles` } className="btn btn-outline-danger">Cancel</a>
                        <button className="btn btn-success ms-2"
                        onClick={ saveOrder }>Save</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default OrderCreate;