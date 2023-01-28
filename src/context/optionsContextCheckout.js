import { createContext, useState, useEffect } from "react";


export const OptionsContextCheckout = createContext();

const initMercadopagoTransparente = JSON.parse(localStorage.getItem('mercadopagoTransparenteCHO')) || {id: "mercadopago_transparent_card",  display: false, text: null};
const initMercadopagoRedirect = JSON.parse(localStorage.getItem('mercadopagoRedirectCHO')) || {id: "mercadopago_redirect", display: false, text: null};
const initMercadopagoOffline = JSON.parse(localStorage.getItem('mercadopagoOfflineCHO')) || {id: "mercadopago_transparent_offline", display: false, text: null};
const initUalaTransparente = JSON.parse(localStorage.getItem('ualaTransparenteCHO')) || {id: "UALA_PROD", display: false, text: null};
const initCustomWire = JSON.parse(localStorage.getItem('customWireCHO')) || {id: "custom_payment_wire_transfer_production", display: false, text: null};
const initCustomCash = JSON.parse(localStorage.getItem('customCashCHO')) || {id: "custom_payment_cash_production", display: false, text: null};
const initCustomOther = JSON.parse(localStorage.getItem('customOtherCHO')) || {id: "custom_payment_other_production", display: false, text: null};


export const OptionsCheckout = ({children}) => {

    const [mercadopago_transparent_card, set_mercadopago_transparent_card] = useState(initMercadopagoTransparente);
    const [mercadopago_redirect, set_mercadopago_redirect] = useState(initMercadopagoRedirect);
    const [mercadopago_transparent_offline, set_mercadopago_transparent_offline] = useState(initMercadopagoOffline);
    const [UALA_PROD, set_UALA_PROD] = useState(initUalaTransparente);
    const [custom_payment_wire_transfer_production, set_custom_payment_wire_transfer_production] = useState(initCustomWire);
    const [custom_payment_cash_production, set_custom_payment_cash_production] = useState(initCustomCash);
    const [custom_payment_other_production, set_custom_payment_other_production] = useState(initCustomOther);

    const [payments, setPayments] = useState({
        mercadopago_transparent_card: initMercadopagoTransparente,
        mercadopago_redirect: initMercadopagoRedirect,
        mercadopago_transparent_offline: initMercadopagoOffline,
        UALA_PROD: initUalaTransparente,
        custom_payment_wire_transfer_production: initCustomWire,
        custom_payment_cash_production: initCustomCash,
        custom_payment_other_production: initCustomOther,
    });
    


    const totalSelectionCHO = [
        payments.mercadopago_transparent_card,
        payments.mercadopago_redirect,
        payments.mercadopago_transparent_offline,
        payments.UALA_PROD,
        payments.custom_payment_wire_transfer_production,
        payments.custom_payment_cash_production,
        payments.custom_payment_other_production
    ];
    
    const [paymentMethodsData, setPaymentMethodsData] = useState([
        {
            id: "mercadopago_transparent_card",
            paymentName: "Mercado Pago Transparente",
            img: "https://checkout-security.ms.tiendanube.com/img/brands/original/mercadopago.svg",
            dataContext: payments.mercadopago_transparent_card,
            setValuePayment: set_mercadopago_transparent_card //REVISAR
        },
        {
            id: "mercadopago_redirect",
            paymentName: "Mercado Pago Redirect",
            img: "https://checkout-security.ms.tiendanube.com/img/brands/original/mercadopago.svg",
            dataContext: payments.mercadopago_redirect,
            setValuePayment: set_mercadopago_redirect //REVISAR
        },
        {
            id: "mercadopago_transparent_offline",
            paymentName: "Mercado Pago Offline (Rapipago/Pagofácil)",
            img: null,
            dataContext: payments.mercadopago_transparent_offline,
            setValuePayment: set_mercadopago_transparent_offline //REVISAR
        },
        {
            id: "UALA_PROD",
            paymentName: "Ualá Transparente",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Logotipo_de_Ual%C3%A1.svg/2560px-Logotipo_de_Ual%C3%A1.svg.png",
            dataContext: payments.UALA_PROD,
            setValuePayment: set_UALA_PROD, //REVISAR
        },
        {
            id: "custom_payment_wire_transfer_production",
            paymentName: "Transferencia bancaria (personalizado del admin)",
            img: null,
            dataContext: payments.custom_payment_wire_transfer_production,
            setValuePayment: set_custom_payment_wire_transfer_production //REVISAR
        },
        {
            id: "custom_payment_cash_production",
            paymentName: "Efectivo (personalizado del admin)",
            img: null,
            dataContext: payments.custom_payment_cash_production,
            setValuePayment: set_custom_payment_cash_production //REVISAR
        },
        {
            id: "custom_payment_other_production",
            paymentName: "A convenir (personalizado del admin)",
            img: null,
            dataContext: payments.custom_payment_other_production,
            setValuePayment: set_custom_payment_cash_production //REVISAR
        },
    ]);


    const changeValueTextPayment = (paymentId, textEntry) => {
        payments[paymentId].text = textEntry;
        setPayments({...payments});
        console.log(payments[paymentId].text);
    }


    const changeDisplayPayment = (paymentId, displaySet) => {
        payments[paymentId].display = displaySet;
        setPayments({...payments});
    }


    return (
        <OptionsContextCheckout.Provider value={{
            mercadopago_transparent_card,
            mercadopago_redirect,
            mercadopago_transparent_offline,
            UALA_PROD,
            custom_payment_wire_transfer_production,
            custom_payment_cash_production,
            custom_payment_other_production,
            set_mercadopago_transparent_card,
            set_mercadopago_redirect,
            set_mercadopago_transparent_offline,
            set_UALA_PROD,
            set_custom_payment_wire_transfer_production,
            set_custom_payment_cash_production,
            set_custom_payment_other_production,
            totalSelectionCHO,
            paymentMethodsData,
            changeValueTextPayment,
            changeDisplayPayment
        }}>
          {children}
        </OptionsContextCheckout.Provider>
    )
}