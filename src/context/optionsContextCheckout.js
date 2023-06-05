import { createContext, useState } from "react";


export const OptionsContextCheckout = createContext();

const initMercadopagoTransparente = JSON.parse(localStorage.getItem('mercadopagoTransparenteCHO')) || {id: "mercadopago_transparent_card",  display: false, text: null};
const initMercadopagoRedirect = JSON.parse(localStorage.getItem('mercadopagoRedirectCHO')) || {id: "mercadopago_redirect", display: false, text: null};
const initMercadopagoOffline = JSON.parse(localStorage.getItem('mercadopagoOfflineCHO')) || {id: "mercadopago_transparent_offline", display: false, text: null};
const initUalaTransparente = JSON.parse(localStorage.getItem('ualaTransparenteCHO')) || {id: "UALA_PROD", display: false, text: null};
const wibond_redirect = JSON.parse(localStorage.getItem('wibondRedirectCHO')) || {id: "wibond_redirect", display: false, text: null};
const initGetnetTransparente = JSON.parse(localStorage.getItem('getnetTransparenteCHO')) || {id: "GETNET_PROD", display: false, text: null};
const initNuvempago = JSON.parse(localStorage.getItem('nuvemPagoCHO')) || {id: "nuvempago_transparent_card", display: false, text: null};
const initMobbex = JSON.parse(localStorage.getItem('mobbexCHO')) || {id: "mobbex_gateway_external", display: false, text: null};
const initModoModal = JSON.parse(localStorage.getItem('modoModalCHO')) || {id: "modo_modal", display: false, text: null};
const initModoRedirect = JSON.parse(localStorage.getItem('modoRedirectCHO')) || {id: "modo_redirect", display: false, text: null};
const initDlocalTransparente = JSON.parse(localStorage.getItem('dlocalTransparenteCHO')) || {id: "dlocal_transparent_card", display: false, text: null};
const initCustomWire = JSON.parse(localStorage.getItem('customWireCHO')) || {id: "custom_payment_wire_transfer_production", display: false, text: null};
const initCustomCash = JSON.parse(localStorage.getItem('customCashCHO')) || {id: "custom_payment_cash_production", display: false, text: null};
const initCustomOther = JSON.parse(localStorage.getItem('customOtherCHO')) || {id: "custom_payment_other_production", display: false, text: null};


export const OptionsCheckout = ({children}) => {

    const [mercadopago_transparent_card, set_mercadopago_transparent_card] = useState(initMercadopagoTransparente);
    const [mercadopago_redirect, set_mercadopago_redirect] = useState(initMercadopagoRedirect);
    const [mercadopago_transparent_offline, set_mercadopago_transparent_offline] = useState(initMercadopagoOffline);
    const [UALA_PROD, set_UALA_PROD] = useState(initUalaTransparente);
    const [wibond_redirect, set_wibond_redirect] = useState(initWibond);
    const [GETNET_PROD, set_GETNET_PROD] = useState(initGetnetTransparente);
    const [nuvempago_transparent_card, set_nuvempago_transparent_card] = useState(initNuvempago);
    const [mobbex_gateway_external, set_mobbex_gateway_external] = useState(initMobbex);
    const [modo_redirect, setModoRedirect] = useState(initModoRedirect);
    const [modo_modal, setModoModal] = useState(initModoModal);
    const [dlocal_transparent_card, setDlocalTransparente] = useState(initDlocalTransparente);
    const [custom_payment_wire_transfer_production, set_custom_payment_wire_transfer_production] = useState(initCustomWire);
    const [custom_payment_cash_production, set_custom_payment_cash_production] = useState(initCustomCash);
    const [custom_payment_other_production, set_custom_payment_other_production] = useState(initCustomOther);

    const [payments, setPayments] = useState({
        mercadopago_transparent_card: initMercadopagoTransparente,
        mercadopago_redirect: initMercadopagoRedirect,
        mercadopago_transparent_offline: initMercadopagoOffline,
        UALA_PROD: initUalaTransparente,
        wibond_redirect: initWibond,
        mobbex_gateway_external: initMobbex,
        modo_redirect: initModoRedirect,
        modo_modal: initModoModal,
        dlocal_transparent_card: initDlocalTransparente,
        GETNET_PROD: initGetnetTransparente,
        nuvempago_transparent_card: initNuvempago,
        custom_payment_wire_transfer_production: initCustomWire,
        custom_payment_cash_production: initCustomCash,
        custom_payment_other_production: initCustomOther,
    });


    //Dejamos solo los que tienen información
    const totalSelectionCHOOptimized = () =>{

        var totalSelectionCHOOptimized= {};

        Object.entries(payments).forEach(entry => {
            const [payment, paymentObject] = entry;
            if ((paymentObject.display === true ) && paymentObject.text !== null) {
                totalSelectionCHOOptimized[payment] = paymentObject;
            }

        });  
        
        return totalSelectionCHOOptimized;
    }


    const totalSelectionCHO = totalSelectionCHOOptimized();

    
    const [paymentMethodsData, setPaymentMethodsData] = useState([
        {
            id: "mercadopago_transparent_card",
            paymentName: "Mercado Pago Transparente",
            img: ["https://checkout-security.ms.tiendanube.com/img/brands/original/mercadopago.svg"],
            dataContext: payments.mercadopago_transparent_card,
            setValuePayment: set_mercadopago_transparent_card //REVISAR
        },
        {
            id: "mercadopago_redirect",
            paymentName: "Mercado Pago Redirect",
            img: ["https://checkout-security.ms.tiendanube.com/img/brands/original/mercadopago.svg"],
            dataContext: payments.mercadopago_redirect,
            setValuePayment: set_mercadopago_redirect //REVISAR
        },
        {
            id: "mercadopago_transparent_offline",
            paymentName: "Mercado Pago Offline (Rapipago/Pagofácil)",
            img: ["https://seeklogo.com/images/P/pago-facil-2019-logo-8BE6DD28D6-seeklogo.com.png", "https://searchvectorlogo.com/wp-content/uploads/2020/03/rapipago-logo-vector.png"],
            dataContext: payments.mercadopago_transparent_offline,
            setValuePayment: set_mercadopago_transparent_offline //REVISAR
        },
        {
            id: "UALA_PROD",
            paymentName: "Ualá Transparente",
            img: ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Logotipo_de_Ual%C3%A1.svg/2560px-Logotipo_de_Ual%C3%A1.svg.png"],
            dataContext: payments.UALA_PROD,
            setValuePayment: set_UALA_PROD, //REVISAR
        },
        {
            id: "wibond_redirect",
            paymentName: "Wibond",
            img: "https://repositorio-tiendanube.s3.us-east-2.amazonaws.com/logo-wibond-124x28.png",
            dataContext: payments.wibond_redirect,
            setValuePayment: set_UALA_PROD, //REVISAR
        },
        {
            id: "GETNET_PROD",
            paymentName: "Getnet Transparente",
            img: ["https://placetopay-static-prod-bucket.s3.us-east-2.amazonaws.com/getnet-cl/microsites/images/IUiurDL047GLr2Nnu39sZPOum7PzgiAgyEocYzxx.png"],
            dataContext: payments.GETNET_PROD,
            setValuePayment: set_GETNET_PROD //REVISAR
        },
        {
            id: "nuvempago_transparent_card",
            paymentName: "Nuvempago / Pagonube",
            img: [],
            dataContext: payments.nuvempago_transparent_card,
            setValuePayment: set_nuvempago_transparent_card
        },
        {
            id: "mobbex_gateway_external",
            paymentName: "Mobbex",
            img: ["https://res.mobbex.com/tiendanube/mobbex-logo-160x100px.png"],
            dataContext: payments.mobbex_gateway_external,
            setValuePayment: set_mobbex_gateway_external
        },
        {
            id: "modo_redirect",
            paymentName: "MODO Redirect",
            img: ["https://ecommerce.modo.com.ar/modo-400.png"],
            dataContext: payments.modo_redirect,
            setValuePayment: setModoRedirect
        },
        {
            id: "modo_modal",
            paymentName: "MODO Modal",
            img: ["https://ecommerce.modo.com.ar/modo-400.png"],
            dataContext: payments.modo_modal,
            setValuePayment: setModoModal
        },
        {
            id: "dlocal_transparent_card",
            paymentName: "Dlocal transparente",
            img: ["https://d2r9epyceweg5n.cloudfront.net/stores/001/221/796/products/dlocal_logo1-64de9e8f262dc22b7f16787169301663-480-0.png"],
            dataContext: payments.dlocal_transparent_card,
            setValuePayment: setDlocalTransparente
        },
        {
            id: "custom_payment_wire_transfer_production",
            paymentName: "Transferencia bancaria (personalizado del admin)",
            img: [],
            dataContext: payments.custom_payment_wire_transfer_production,
            setValuePayment: set_custom_payment_wire_transfer_production //REVISAR
        },
        {
            id: "custom_payment_cash_production",
            paymentName: "Efectivo (personalizado del admin)",
            img: [],
            dataContext: payments.custom_payment_cash_production,
            setValuePayment: set_custom_payment_cash_production //REVISAR
        },
        {
            id: "custom_payment_other_production",
            paymentName: "A convenir (personalizado del admin)",
            img: [],
            dataContext: payments.custom_payment_other_production,
            setValuePayment: set_custom_payment_cash_production //REVISAR
        }
    ]);


    const changeValueTextPayment = (paymentId, textEntry) => {
        payments[paymentId].text = textEntry;
        setPayments({...payments});
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
            wibond_redirect,
            GETNET_PROD,
            nuvempago_transparent_card,
            mobbex_gateway_external,
            modo_redirect,
            modo_modal,
            dlocal_transparent_card,
            custom_payment_wire_transfer_production,
            custom_payment_cash_production,
            custom_payment_other_production,
            set_mercadopago_transparent_card,
            set_mercadopago_redirect,
            set_mercadopago_transparent_offline,
            set_UALA_PROD,
            set_wibond_redirect,
            set_custom_payment_wire_transfer_production,
            set_custom_payment_cash_production,
            set_custom_payment_other_production,
            totalSelectionCHO,
            totalSelectionCHOOptimized,
            payments,
            paymentMethodsData,
            changeValueTextPayment,
            changeDisplayPayment
        }}>
          {children}
        </OptionsContextCheckout.Provider>
    )
}