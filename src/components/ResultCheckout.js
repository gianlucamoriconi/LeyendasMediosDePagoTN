import Footer from './Footer';
import CopyToClipboard from './CopyToClipboard';
import { useContext, useState, useEffect } from 'react';
import { OptionsContextCheckout } from '../context/optionsContextCheckout';
import { Link } from "react-router-dom";
import PaymentBenefitScript from './scriptsCheckout/PaymentBenefitScript';


const ResultCheckout = () => {
    const [title, setTitle] = useState('No detectamos que hayas elegido hacer cambios');
    const [selectionIsEmpty, setSelectionIsEmpty] = useState(true);
    const { totalSelectionCHOOptimized } = useContext(OptionsContextCheckout);

    window.scrollTo({top: 0, behavior: 'smooth'});

    const verInfoTotal = () => {
        console.log(totalSelectionCHOOptimized());
    }


    useEffect(() => {
        if (JSON.stringify(totalSelectionCHOOptimized()) === '{}') {
            setSelectionIsEmpty(true);
            setTitle("No detectamos que hayas elegido hacer cambios");
        }

        else{
            setSelectionIsEmpty(false);
            setTitle("Copiá y pegá este código");
        }

        console.log(totalSelectionCHOOptimized());
    }, [totalSelectionCHOOptimized]);


    return (
        <div className='d-flex bg-light'>
            <Link to='/' className='btn btn-secondary position-fixed'>Volver a edición</Link>           
            <div className='p-5 d-flex flex-wrap m-auto max-width-900'>
                {!selectionIsEmpty ? 
                    <>
                        <div id="titleContainer" className='pb-4 pt-4 mb-3 mt-5 w-100'>
                            <h2 className='main-title mb-4'>{title}</h2>
                            <p>en la sección <strong>Configuraciones &gt; Códigos de tracking (Para el checkout)</strong></p>
                        </div>
                        <div className='w-100 background-grey p-3 max-width-900 m-auto'>
                            <div className='position-relative'>
                                <pre className="text-to-copy"> 
                                    <PaymentBenefitScript object={totalSelectionCHOOptimized()}/>
                                </pre>
                                <CopyToClipboard/>
                            </div>
                        </div>
                        <button onClick={verInfoTotal}>Ver objecto en consola</button>
                    </>
                :
                    <div id="titleContainer" className='pb-4 pt-4 mb-3 mt-5 w-100'>
                        <h2 className='main-title mb-4'>{title}</h2>
                        <p>Volvé a la página de edición y elegí los cambios que querés hacer para poder generar el código.</p>
                        <div>
                            <Link to='/' className='btn btn-primary m-auto'>Ir a la edición</Link>
                        </div>
                    </div>
                }

            </div>
            <Footer color="light"/>
        </div>     

    )
}

export default ResultCheckout;