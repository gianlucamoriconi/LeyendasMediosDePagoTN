// import { Link } from 'react-router-dom';
import Footer from './Footer';
import BottomMenu from './BottomMenu';
import Menu from './Menu';
import Presentation from './Presentation';
import EditZone from './EditZone/EditZone';
import { useState } from 'react';



const Home = () => {
    const [zoneTitle, setTitle] = useState("Para la tienda");
    const [zone, setZone] = useState("Para la tienda");


    return (
        <>
            <div id="presentation" className='hv-100 p-5 d-flex flex-wrap justify-content-center'>
                <div className='w-100 d-flex w-100'>
                    <h1 className='main-title mt-auto mb-4 ms-auto me-auto'>Leyendas de medios de pago en <strong className='main-title'>Tiendanube</strong></h1>
                </div>
                <div className='description w-100 max-width-900'>   
                    <p className='text-center mb-0'>Las leyendas que configures van a reemplazar a todas las que tenés actualmente en cada parte del diseño.</p>
                    <p className='text-center'>Por ejemplo, si configurás 2 leyendas para "Productos en listado", la que tengas actualmente desaparecerá y en su lugar aparecerán las 2 que configuraste acá.</p>
                </div>
            </div>
        </>
        
    )
}

export default Home;