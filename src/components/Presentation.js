import ModalCustom from './resources/ModalCustom';



const Presentation = () => {
    const bodyModal = "Las leyendas que configures van a reemplazar a todas las que tenés actualmente en cada parte del diseño. Por ejemplo, si configurás 2 leyendas para \"Productos en listado\", la que tengas actualmente desaparecerá y en su lugar aparecerán las 2 que configuraste acá.";

    return (
        <>
            <div id="presentation" className='min-vh-90 p-5 d-flex flex-wrap justify-content-center'>
                <div className='w-100 d-flex w-100'>
                    <h1 className='main-title mt-auto mb-4 ms-auto me-auto'>Leyendas de medios de pago en <strong className='main-title'>Tiendanube</strong></h1>
                </div>
                <div className='description w-100 max-width-900'>  
                    <div className='mb-5 alert alert-warning mb-5'>
                        <p className='text-center fw-bold fs-sm-7 mb-0'>Antes de usar esta app recordá que no es una solución definitiva para tus leyendas sino un parche.</p> 
                        <p className='text-center fw-bold fs-sm-7 mb-0'>Lo ideal, es que primero reportes el error o pedido de mejora a Tiendanube para que puedan trabajar en una solución de raíz, luego usar la app.</p> 
                    </div>
                    <div className='text-center d-md-none'>
                        <ModalCustom buttonText={"¿Cómo funcionan las leyendas?"} title={"¿Cómo funcionan las leyendas?"} body={bodyModal} question={true}/>
                    </div>                    
                    <div className='how-to-use d-none d-md-block line-height-29'>
                    <div className='title-styled d-flex m-auto mb-3'>
                        <h3 className='mt-auto mb-auto d-flex'>¿Cómo funcionan las leyendas?</h3>
                    </div>
                        <p className='fs-sm-7 mb-0'>Las leyendas que configures van a reemplazar a todas las que tenés actualmente en cada parte del diseño.</p>
                        <p className='fs-sm-7 mb-0'>Por ejemplo, si configurás 2 leyendas para "Productos en listado", la que tengas actualmente desaparecerá y en su lugar aparecerán las 2 que configuraste acá.</p>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Presentation;