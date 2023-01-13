
import LinesForm from '../LinesForm';
import Title from './Title';


const Items = () => {

    //Creamos un array de objetos que contendrá cada leyenda custom creada, vamos pusheando a medida que crean.
    // const arrayItemsObjects = [{}];
    
    //Ejemplo de objeto de leyenda, cada vez que creamos uno lo pusheamos en el array de arriba
    // const itemObjectExample = {
    //     id: 1 /* Identificador de leyenda */,
    //     installments: 12 /* Cantidad de cuotas sin interés, dato obligatorio. Recibe un number */,
    //     paymentMethod: "Mercadopago" /* nombre del medio de pago, recibe un string. Si no tiene, lo dejamos en null*/
    // };

    
    // const pushLeyendInObject = (e) =>{

    // };

    // const deleteLeyendInObject = (e) =>{

    // };


    return (
        <>
            <Title value="Productos en listado"></Title>
            <div id="itemProducts" className="container-lines-config">
                <LinesForm zone="itemProducts" />
            </div>
        </>
    )
}

export default Items;