import { Link } from "react-router-dom";

const BottomMenu = () => {

    return (
        <>
        <div id="bottom-menu" className="position-fixed shadow w-100 p-3 rounded bg-white bottom-0 ">
            <div className="d-flex flex-wrap w-100">
                <div className="col-4 pe-3">
                    <a className="btn-primary btn w-100">Para la tienda</a>
                </div>
                <div className="col-4 pe-3">
                    <a className="btn-primary btn w-100">Para el checkout</a>
                </div>
                <div className="col-4">
                    <Link to="/result" className="btn btn-primary font-monospace fs-6 ms-4">&#60; Ver código &#62;</Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default BottomMenu;