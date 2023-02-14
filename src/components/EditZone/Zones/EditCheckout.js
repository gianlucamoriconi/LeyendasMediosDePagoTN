import Title from './Title';
import { useContext } from 'react';
import { OptionsContextCheckout } from '../../../context/optionsContextCheckout';
import SwitcherBox from '../../resources/SwitcherBox';
import ReportAndSeeCode from '../../resources/ModalReport';




const EditCheckout = () => {

    const { paymentMethodsData, changeValueTextPayment, changeDisplayPayment } = useContext(OptionsContextCheckout);
    const { totalSelectionCHOOptimized } = useContext(OptionsContextCheckout);

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
                    <ReportAndSeeCode 
                        checkoutOrStore="checkout"
                        successPage={"/result-checkout"}
                        buttonText={"Ver código"} 
                        buttonClasses={"btn btn-primary shadow font-monospace fs-6 m-auto"}
                        totalSelection={totalSelectionCHOOptimized()}
                    />
                </div>
            </div>
        </>
    )
}

export default EditCheckout;