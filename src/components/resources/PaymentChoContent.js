import TextField from '@mui/material/TextField';



const PaymentChoContent = ({objectContent, handleChangeText}) => {

  return (
    <>

        <div className="container-lines-config w-100 mt-4">
          <TextField id={objectContent.id} onChange={handleChangeText} size="small" label="Ej: 6 cuotas sin interés" variant="outlined" />
        </div>
    </>
  )
}

export default PaymentChoContent;