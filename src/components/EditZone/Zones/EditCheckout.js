import Title from './Title';
import AntSwitch from '../../resources/AntSwitch';
import Stack from '@mui/material/Stack';
import paymentMethods from '../../../payments/paymentMethods';



const EditCheckout = () => {


    return (
        <>
            <Title value="Texto promocional en cada medio de pago (checkout)"></Title>
            <div id="editCheckout" className="container-lines-config">
                <div>
                    <p>Activá los medios de pago que querés editar y colocales el nuevo texto:</p>
                    <div className='payment-methods-container p-3 me-3'>
                        {
                            paymentMethods.map((payment) => {
                                return (
                                        <div key={payment.id} id={payment.id} className='d-flex flex-wrap w-100 p-3 mb-4 shadow-sm border rounded'>
                                            <div className='payment-info d-flex mt-auto mb-auto w-100'>
                                                <div className='payment-header d-flex w-100 justify-content-between'>
                                                    <div className='payement-title-container d-flex'>
                                                        <div className='payment-name-container'>
                                                            {payment.paymentName}
                                                        </div>
                                                        {payment.img !== null ?
                                                        <div className='payment-img-container'>
                                                            <img className='payment-img ms-3' alt={'Logo de ' + payment.paymentName} src={payment.img}/>
                                                        </div>
                                                        : null
                                                        }
                                                    </div>
                                                    <div className='payement-switch-container'>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <AntSwitch inputProps={{ 'aria-label': 'ant design' }} />
                                                        </Stack>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCheckout;