import LinesForm from '../LinesForm';
import Title from './Title';


const Cart = () => {
    return (
        <>
            <Title value="Carrito"></Title>
            <div id="cart" className="container-lines-config">
                <LinesForm zone="cart" />
            </div>
        </>
    )
}

export default Cart;