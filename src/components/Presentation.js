// import { useState } from 'react';
import { Link } from 'react-router-dom';



const Presentation = ({zone, handleEditZoneSelected}) => {

    return (
        <>
            <div id="presentation" className='hv-90 p-5 d-flex flex-wrap justify-content-center'>
                <div className='w-100 d-flex w-100'>
                    <h1 className='main-title mt-auto mb-4 ms-auto me-auto'>Leyendas de medios de pago en <strong className='main-title'>Tiendanube</strong></h1>
                </div>
                <div className='description w-100 max-width-900'>   
                    <p className='text-center mb-0'>Las leyendas que configures van a reemplazar a todas las que tenés actualmente en cada parte del diseño.</p>
                    <p className='text-center'>Por ejemplo, si configurás 2 leyendas para "Productos en listado", la que tengas actualmente desaparecerá y en su lugar aparecerán las 2 que configuraste acá.</p>
                </div>
                <div className='position-absolute start-buttons-container'>
                    <button id='storefront' onClick={handleEditZoneSelected} className={'btn btn-primary start-button shadow me-3' + (zone.zone === "storefront" ? " active" : "")}>Para la tienda</button>
                    <button id='checkout' onClick={handleEditZoneSelected} className={'btn btn-primary start-button shadow ms-3' + (zone.zone === "checkout" ? " active" : "")}>Checkout</button>
                </div>
            </div>
        </>
        
    )
}

export default Presentation;