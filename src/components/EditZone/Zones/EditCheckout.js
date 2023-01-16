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

    const { paymentMethodsData, 
        mercadopago_transparent_card,
        mercadopago_redirect,
        mercadopago_transparent_offline,
        UALA_PROD,
        custom_payment_wire_transfer_production,
        custom_payment_cash_production,
        custom_payment_other_production 
    } = useContext(OptionsContextCheckout);


    return (
        <>
            <Title value="Texto promocional en cada medio de pago (checkout)"></Title>
            <div id="editCheckout" className="container-lines-config w-100">
                <p className='mb-5'>Activá los medios de pago que querés editar y colocales el nuevo texto:</p>
                <div className='payment-methods-container'>
                    {
                        paymentMethodsData.map((payment) => {
                            return <SwitcherBox key={payment.id} content={payment}/>
                        })
                    }
                </div>
                <div className='m-auto d-flex'>
                    <Link to="/result" className="btn btn-primary shadow font-monospace fs-6 m-auto">&#60; Ver código &#62;</Link>
                </div>
            </div>
        </>
    )
}

export default EditCheckout;