const paymentBenefitScript = (paymentsData) => {

    /*
        Este será el objeto final que verá la página Resultado Checkout.
        Lo armamos solo con los textos y el id que es lo necesario para el script,
        solo contendrán aquellos medios de pago que dejaron activados en la edición.
    */
    var paymentsTexts = [];
   
    paymentsData.forEach(payment => {
        if (payment.dataContext.display === true) {
            const paymentData = {
                paymentId: payment.id,
                paymentText: payment.dataContext.text
            };
            paymentsTexts.push(paymentData);
        }
    });

    console.log(paymentsTexts);
    console.log(paymentsData);

    return paymentsTexts;
}

export { paymentBenefitScript };