import Footer from './Footer';
import CopyToClipboard from './CopyToClipboard';
import Menu from './Menu';
import { useContext, useState } from 'react';
import { OptionsContextCheckout } from '../context/optionsContextCheckout';
import { Link } from "react-router-dom";
import { paymentBenefitScript } from './scriptsCheckout/paymentBenefit'


const ResultCheckout = () => {
    const { paymentMethodsData } = useContext(OptionsContextCheckout);
    console.log(paymentBenefitScript(paymentMethodsData));

    window.scrollTo({top: 0, behavior: 'smooth'});


    return (
        <div className='d-flex bg-light'>
            <Link to='/' className='btn btn-secondary position-fixed'>Volver a edición</Link>           
            <div className='p-5 d-flex flex-wrap m-auto max-width-900'>
                <div id="titleContainer" className='pb-4 pt-4 mb-3 mt-5 w-100'>
                    <h2 className='main-title mb-0'>Copiá y pegá este código</h2>
                    <p>en la sección <strong>Configuraciones &gt; Códigos de tracking (Para el checkout)</strong></p>
                </div>
                <div className='w-100 background-grey p-3 max-width-900 m-auto'>
                    <div className='position-relative'>
                        <pre className="text-to-copy"> 
                        
                        </pre>
                        <CopyToClipboard/>
                    </div>
                </div>
            </div>
            <Footer color="light"/>
        </div>     

    )
}

export default ResultCheckout;