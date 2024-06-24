import { useEffect, useState } from "react";
import NavMenu from "../menu/NavMenu";
import api from "../../util/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VehiclesForms = () => {
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(true);

    const [model, setModel] = useState("");
    const [color, setColor] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [brand, setBrand] = useState(0);
    const navigate = useNavigate();

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

    const getBrands = () => {
        api.get('/vehicles/brands').then( ({ data }) => {
            setBrands(data);
            setLoading(false);
        });
    }

    const saveVehicle = () => {
        const data = { model, color, description, stock, price, discount, brand: { id: brand } };
        api.post('/vehicles/', data).then( response => {
            if ( response?.data?.id ) {
                showSuccessMessage('Product saved.')
                return navigate(`/vehicles`);
            }
            showErrorMessage("Something is wrong");
          }).catch( error => {
            showErrorMessage('Error!!');
          });
    }

    useEffect(() => { getBrands() }, []);

    if ( loading ) {
        return ( <div></div> )
    }

    return(
        <div>
            <NavMenu/>
            <section className="mt-4">
                <h2>New Product</h2>
                <hr />
                <div className="row">
                    <div className="form-group col-md-4 mb-3">
                        <label className="form-label" htmlFor="model">Model</label>
                        <input type="text" className="form-control" name="model" id="model"
                        onChange={ e => setModel(e.target.value) }/>
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label className="form-label" htmlFor="color">Color</label>
                        <input type="text" className="form-control" name="color" id="color"
                        onChange={ e => setColor(e.target.value) }/>
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label className="form-label" htmlFor="decription">Description</label>
                        <input type="text" className="form-control" name="decription" id="decription"
                        onChange={ e => setDescription(e.target.value) }/>
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label className="form-label" htmlFor="stock">Stock</label>
                        <input type="number" className="form-control" name="stock" id="stock"
                        onChange={ e => setStock(e.target.value) }/>
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label className="form-label" htmlFor="price">Price</label>
                        <input type="number" className="form-control" name="price" id="price"
                        onChange={ e => setPrice(e.target.value) }/>
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label className="form-label" htmlFor="discount">Discount</label>
                        <input type="number" className="form-control" name="discount" id="discount"
                        onChange={ e => setDiscount(e.target.value) }/>
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label className="form-label" htmlFor="brand">Brand</label>
                        <select className="form-control" onChange={ e => setBrand(e.target.value) }>
                            <option value="0" disabled>Select a brand</option>
                            { brands.map(brand => (
                                <option value={ brand.id }>{ brand.name }</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-1">
                        <a href={ `/vehicles` } className="btn btn-outline-danger">Cancel</a>
                        <button className="btn btn-success ms-2"
                        onClick={ saveVehicle }>Save</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default VehiclesForms;