import { Link } from "react-router-dom";

const NotFound = () => {
    return(
        <div className="container">
            <h1>Not found</h1>
            <div>
                <Link to="/">Back to home page</Link>
            </div>
        </div>
    )
}

export default NotFound;