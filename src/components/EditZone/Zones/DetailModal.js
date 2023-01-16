
import Title from './Title';
import Switcher from '../../resources/Switcher';
import Description from './Description';
import FormGroup from '@mui/material/FormGroup';
import { useContext } from 'react';
import { OptionsContextObject } from '../../../context/optionsContextObject';


const DetailMain = () => {
  const {setModalMercadopago,
    setModalMobbex,
    setModalPagonube,
    setModalModo,
    setModalDlocal,
    setModalGocuotas,
    setModalUala
  } = useContext(OptionsContextObject);

    const payments = [
      {
        paymentName: "Mercadopago",
        savedId: "modalMercadopago",
        idSelector: "#installment_mercadopago_",
        setValues: setModalMercadopago
      },
      {
        paymentName: "Modo",
        savedId: "modalModo",
        idSelector: "#installment_modo_",
        setValues: setModalModo
      },
      {
        paymentName: "Mobbex",
        savedId: "modalMobbex",
        idSelector: "#installment_mobbex_",
        setValues: setModalMobbex
      },
      {
        paymentName: "Pagonube",
        savedId: "modalPagonube",
        idSelector: "#installment_pago_nube_",
        setValues: setModalPagonube
      },
      {
        paymentName: "Uala",
        savedId: "modalUala",
        idSelector: "#installment_ualá_",
        setValues: setModalUala
      },
      {
        paymentName: "Dlocal",
        savedId: "modalDlocal",
        idSelector: "#installment_dlocal_payments_",
        setValues: setModalDlocal
      },
      {
        paymentName: "Gocuotas",
        savedId: "modalGocuotas",
        idSelector: "#installment_gocuotas_",
        setValues: setModalGocuotas
      }
    ];

    return (
      <>
          <Title value="Modal en detalle de producto (pop-up)"></Title>
          <Description value="Activá y editá en los medios de pago que tenés activos en tu tienda. Las cuotas que se mostrarán serán sin interés."></Description>
          <div id="detailMainModal" className="container-lines-config">
            <FormGroup>
            {payments.map((payment, i) =>{
              return (<Switcher setValues={payment.setValues} key={i} savedId={payment.savedId} idSelector={payment.idSelector} labelName={payment.paymentName} defaultCheckedValue={false} />)
            })
            }
            </FormGroup>
          </div>
      </>
    )
}

export default DetailMain;