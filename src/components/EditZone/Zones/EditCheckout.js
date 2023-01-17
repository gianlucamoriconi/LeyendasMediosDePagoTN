import Title from './Title';
import IOSSwitcher from '../../resources/IOSSwitch';
import Stack from '@mui/material/Stack';
import paymentMethods from '../../../payments/paymentMethods';
import { Link } from 'react-router-dom';
import PaymentChoContent from '../../resources/PaymentChoContent';
import { useContext, useState, useEffect } from 'react';
import { OptionsContextCheckout } from '../../../context/optionsContextCheckout';
import SwitcherBox from '../../resources/SwitcherBox';



const EditCheckout = () => {

    const { paymentMethodsData, changeValueTextPayment, changeDisplayPayment } = useContext(OptionsContextCheckout);


    return (
        <>
            <Title value="Texto promocional en cada medio de pago (checkout)"></Title>
            <div id="editCheckout" className="container-lines-config w-100">
                <p className='mb-5'>Activá los medios de pago que querés editar y colocales el nuevo texto:</p>
                <div className='payment-methods-container'>
                    {
                        paymentMethodsData.map((payment) => {
                            return <SwitcherBox key={payment.id} content={payment} changeValueTextPayment={changeValueTextPayment} changeDisplayPayment={changeDisplayPayment} />
                        })
                    }
                </div>
                <div className='m-auto d-flex'>
                    <Link to="/result-checkout" className="btn btn-primary shadow font-monospace fs-6 m-auto">&#60; Ver código &#62;</Link>
                </div>
            </div>
        </>
    )
}

export default EditCheckout;