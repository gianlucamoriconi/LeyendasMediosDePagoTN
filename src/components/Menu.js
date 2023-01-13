import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const Menu = ({backButton}) => {
    const colorText = "dark";
    let color = "";

    if (colorText === "dark"){
        color = "text-dark";
    } else if(colorText === "light"){
        color = "text-light";
    }

    return (
        <div id="guide" className='col-3 p-5 hv-100 position-fixed'>
            <div className='h-100'>
                <h1 className='title-home main-title mb-4 pt-3 fs-3'>Configurador de leyendas</h1>
                <p className={color}>Las leyendas que configures van a reemplazar a todas las que tenés actualmente en cada parte del diseño.</p>
                <p className={color}>Por ejemplo, si configurás 2 leyendas para "Productos en listado", la que tengas actualmente desaparecerá y en su lugar aparecerán las 2 que configuraste acá.</p>
                <p className={color}>Los lugares donde podés personalizar son:</p>
                <ul className={color}>
                    <li className={color}>Productos en listado</li>
                    <li className={color}>Detalle de producto (leyenda princial)</li>
                    <li className={color}>Detalle de producto (modal)</li>
                    <li className={color}>Leyenda en carrito</li>
                </ul>
                {
                    backButton ?
                    <>
                    <Link to="/" className="btn btn-primary back-button"><IoMdArrowBack/></Link>
                    </>
                    :
                    null
                }
            </div>
        </div>
        )
}

export default Menu;