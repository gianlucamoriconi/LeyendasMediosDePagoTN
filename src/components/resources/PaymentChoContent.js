import Form from 'react-bootstrap/Form';


const PaymentChoContent = ({objectContent, handleChangeText}) => {

  return (
    <>

        <div className="container-lines-config w-100 mt-4">
          <Form.Group className="w-100" controlId={objectContent.id}>
              <Form.Control onChange={handleChangeText} value={objectContent.dataContext.text ? objectContent.dataContext.text : ''} data-id={objectContent.id} type="text" required placeholder="Ej: 6 cuotas sin interés" />
          </Form.Group>
        </div>
    </>
  )
}

export default PaymentChoContent;