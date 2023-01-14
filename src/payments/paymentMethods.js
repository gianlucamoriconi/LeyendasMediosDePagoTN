const paymentMethods = [
    {
        id: "mercadopago_transparent_card",
        paymentName: "Mercado Pago Transparente",
        img: "https://checkout-security.ms.tiendanube.com/img/brands/original/mercadopago.svg"
    },
    {
        id: "mercadopago_redirect",
        paymentName: "Mercado Pago Redirect",
        img: "https://checkout-security.ms.tiendanube.com/img/brands/original/mercadopago.svg"
    },
    {
        id: "mercadopago_transparent_offline",
        paymentName: "Mercado Pago Offline (Rapipago/Pagofácil)",
        img: null
    },
    {
        id: "custom_payment_wire_transfer_production",
        paymentName: "Transferencia bancaria (personalizado del admin)",
        img: null
    },
    {
        id: "UALA_PROD",
        paymentName: "Ualá Transparente",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Logotipo_de_Ual%C3%A1.svg/2560px-Logotipo_de_Ual%C3%A1.svg.png"
    },
    {
        id: "custom_payment_cash_production",
        paymentName: "Efectivo (personalizado del admin)",
        img: null
    }
];

export default paymentMethods;