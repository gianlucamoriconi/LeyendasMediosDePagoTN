
import Title from './Title';
import Switcher from '../../resources/Switcher';
import Description from './Description';
import FormGroup from '@mui/material/FormGroup';
import { useContext } from 'react';
import { OptionsContextObject } from '../../../context/optionsContextObject';


const DetailMain = () => {


  const { payments, handleRemoveSwitcherOptions } = useContext(OptionsContextObject);



  const paymentsData = [
      {
        paymentName: "Mercadopago",
        savedId: "modalMercadopago",
        idSelector: "#installment_mercadopago_",
        modalValues: payments.modalMercadopago
      },
      {
        paymentName: "Modo",
        savedId: "modalModo",
        idSelector: "#installment_modo_",
        modalValues: payments.modalModo
      },
      {
        paymentName: "Mobbex",
        savedId: "modalMobbex",
        idSelector: "#installment_mobbex_",
        modalValues: payments.modalMobbex
      },
      {
        paymentName: "Pagonube",
        savedId: "modalPagonube",
        idSelector: "#installment_pago_nube_",
        modalValues: payments.modalPagonube
      },
      {
        paymentName: "Uala",
        savedId: "modalUala",
        idSelector: "#installment_ualá_",
        modalValues: payments.modalUala
      },
      {
        paymentName: "Dlocal",
        savedId: "modalDlocal",
        idSelector: "#installment_dlocal_payments_",
        modalValues: payments.modalDlocal
      },
      {
        paymentName: "Gocuotas",
        savedId: "modalGocuotas",
        idSelector: "#installment_gocuotas_",
        modalValues: payments.modalGocuotas
      }
    ];


    return (
      <>
          <Title value="Modal en detalle de producto (pop-up)"></Title>
          <Description value="Activá y editá en los medios de pago que tenés activos en tu tienda. Las cuotas que se mostrarán serán sin interés."></Description>
          <div id="detailMainModal" className="container-lines-config">
            <FormGroup>
            {paymentsData.map((payment, i) =>{
              return (<Switcher handleRemoveSwitcherOptions={handleRemoveSwitcherOptions} key={i} savedId={payment.savedId} idSelector={payment.idSelector} labelName={payment.paymentName} defaultCheckedValue={payment.modalValues.length > 0 ? true : false} />)
            })
            }
            </FormGroup>
          </div>
      </>
    )
}

export default DetailMain;