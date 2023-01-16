import { useContext, useState, useEffect } from 'react';
import { OptionsContextCheckout } from '../../context/optionsContextCheckout';
import TextField from '@mui/material/TextField';



const PaymentChoContent = ({objectContent}) => {

  return (
    <>

        <div className="container-lines-config w-100 mt-4">
          <TextField id={objectContent.id} size="small" label="Ej: 6 cuotas sin interés" variant="outlined" />
        </div>
    </>
  )
}

export default PaymentChoContent;