/*
    Este será el objeto final que verá la página Resultado Checkout.
    Lo armamos solo con los textos y el id que es lo necesario para el script,
    solo contendrán aquellos medios de pago que dejaron activados en la edición.
*/

const PaymentBenefitScript = ({object}) => {

    console.log(object);


    const sdkLines = () =>{
        var sdkLines = "";
        Object.entries(object).forEach(entry => {
            const [payment, paymentObject] = entry;
            sdkLines = '\n' + 'window.SDKCheckout.changePaymentBenefit({ id: '+ payment +', value: "'+ paymentObject.text +'" });';
        });

        return sdkLines;
    }


    const currentDate = new Date(Date.now()).toLocaleDateString();


    return (`<!-- Inicio de: APP LEYENDAS - cambiar leyenda promocional medios de pago -->
<script>
  //Fecha de creación: ${currentDate}

  function cambiarLeyendasMediosDePago(){
    setTimeout(function(){
${sdkLines()}
    },200);
  }
    
  if (window.location.href.indexOf("/next/") > -1) {
    window.onload = cambiarLeyendasMediosDePago();
  }
</script>
<!-- Fin de: APP LEYENDAS - cambiar leyenda promocional medios de pago -->
    `)
}

export default PaymentBenefitScript;