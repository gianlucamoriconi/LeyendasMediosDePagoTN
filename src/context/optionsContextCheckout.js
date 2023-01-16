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

    const totalSelectionCHO = [
        mercadopago_transparent_card,
        mercadopago_redirect,
        mercadopago_transparent_offline,
        UALA_PROD,
        custom_payment_wire_transfer_production,
        custom_payment_cash_production,
        custom_payment_other_production
    ];
    
    const [paymentMethodsData, setPaymentMethodsData] = useState([
        {
            id: "mercadopago_transparent_card",
            paymentName: "Mercado Pago Transparente",
            img: "https://checkout-security.ms.tiendanube.com/img/brands/original/mercadopago.svg",
            dataContext: mercadopago_transparent_card,
            setValuePayment: set_mercadopago_transparent_card //REVISAR
        },
        {
            id: "mercadopago_redirect",
            paymentName: "Mercado Pago Redirect",
            img: "https://checkout-security.ms.tiendanube.com/img/brands/original/mercadopago.svg",
            dataContext: mercadopago_redirect,
            setValuePayment: set_mercadopago_redirect //REVISAR
        },
        {
            id: "mercadopago_transparent_offline",
            paymentName: "Mercado Pago Offline (Rapipago/Pagofácil)",
            img: null,
            dataContext: mercadopago_transparent_offline,
            setValuePayment: set_mercadopago_transparent_offline //REVISAR
        },
        {
            id: "UALA_PROD",
            paymentName: "Ualá Transparente",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Logotipo_de_Ual%C3%A1.svg/2560px-Logotipo_de_Ual%C3%A1.svg.png",
            dataContext: UALA_PROD,
            setValuePayment: set_UALA_PROD, //REVISAR
        },
        {
            id: "custom_payment_wire_transfer_production",
            paymentName: "Transferencia bancaria (personalizado del admin)",
            img: null,
            dataContext: custom_payment_wire_transfer_production,
            setValuePayment: set_custom_payment_wire_transfer_production //REVISAR
        },
        {
            id: "custom_payment_cash_production",
            paymentName: "Efectivo (personalizado del admin)",
            img: null,
            dataContext: custom_payment_cash_production,
            setValuePayment: set_custom_payment_cash_production //REVISAR
        },
        {
            id: "custom_payment_other_production",
            paymentName: "A convenir (personalizado del admin)",
            img: null,
            dataContext: custom_payment_other_production,
            setValuePayment: set_custom_payment_cash_production //REVISAR
        },
    ]);


    const changeValueTextPayment = (paymentId, textEntry) => {

        if (paymentId === 'mercadopago_transparent_card') {
            mercadopago_transparent_card.text = textEntry;
            set_mercadopago_transparent_card(mercadopago_transparent_card);
            console.log(mercadopago_transparent_card.text);
        }

        else if (paymentId === 'mercadopago_redirect') {
            mercadopago_redirect.text = textEntry;
            set_mercadopago_redirect(mercadopago_redirect);
            console.log(mercadopago_redirect.text);
        }

        else if (paymentId === 'mercadopago_transparent_offline') {
            mercadopago_transparent_offline.text = textEntry;
            set_mercadopago_transparent_offline(mercadopago_transparent_offline);
            console.log(mercadopago_transparent_offline.text);
        }

        else if (paymentId === 'UALA_PROD') {
            UALA_PROD.text = textEntry;
            set_UALA_PROD(UALA_PROD);
            console.log(UALA_PROD.text);
        }

        else if (paymentId === 'custom_payment_wire_transfer_production') {
            custom_payment_wire_transfer_production.text = textEntry;
            set_custom_payment_wire_transfer_production(custom_payment_wire_transfer_production);
            console.log(custom_payment_wire_transfer_production.text);
        }

        else if (paymentId === 'custom_payment_cash_production') {
            custom_payment_cash_production.text = textEntry;
            set_custom_payment_cash_production(custom_payment_cash_production);
            console.log(custom_payment_cash_production.text);
        }

        else if (paymentId === 'custom_payment_other_production') {
            custom_payment_other_production.text = textEntry;
            set_custom_payment_other_production(custom_payment_other_production);
            console.log(custom_payment_other_production.text);
        }
    }
    

    const contentShowOrHide = (e) =>{
        const switcherId = e.target.id; //this is payment ID, which matches with payment const's state
        
        if (switcherId === "mercadopago_transparent_card") {

                if (mercadopago_transparent_card.display === false) {

                    mercadopago_transparent_card.display = true;
        
                    set_mercadopago_transparent_card(mercadopago_transparent_card);
                    console.log(mercadopago_transparent_card);
                }

                else if (mercadopago_transparent_card.display === true){
                    mercadopago_transparent_card.display = false;
        
                    set_mercadopago_transparent_card(mercadopago_transparent_card);
                    console.log(mercadopago_transparent_card);
                }

                else{
                    console.log(mercadopago_transparent_card);
                    throw Error ("Seems there's no display property :O");
                }
                
        }

    };


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
            contentShowOrHide,
            totalSelectionCHO,
            paymentMethodsData,
            changeValueTextPayment
        }}>
          {children}
        </OptionsContextCheckout.Provider>
    )
}