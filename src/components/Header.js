// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const Header = () => {
    return (
        <>
        <div className="navbar w-100 flex-nowrap pe-3 pt-0 pb-0">
            <nav id="navbar" className="navbar navbar-expand-lg w-100">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/">
                            <div>
                                {/* <img className="logo-img" src={imageLogo} alt="logo" /> */}
                                <span className="logo-name">ALL-QR</span>
                            </div>
                        </NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                    </div>  
            </nav>
        </div>
        </>
    )
}

export default Header;