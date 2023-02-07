import Items from './Zones/Items';
import Box from '../resources/Box';
import DetailMain from './Zones/DetailMain';
import DetailModal from './Zones/DetailModal';
import EditCheckout from './Zones/EditCheckout';
import Cart from './Zones/Cart';
import { Link } from "react-router-dom";
import { OptionsContextObject } from '../../context/optionsContextObject';
import { useContext } from 'react';


const EditZone = ({zone, handleEditZoneSelected}) => {

    // const [validated, setValidated] = useState(false);
    
    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }

    //     setValidated(true);
    // };
    const { totalSelection } = useContext(OptionsContextObject);
    
    const verInfoTotal = () => {
        console.log(totalSelection);
    }

    return (
        <>
        <section id="editZone" className='col p-3 d-flex flex-wrap m-auto max-width-900'>
            <div className='start-buttons-container w-100 d-flex justify-content-center'>
                    <button id='storefront' onClick={handleEditZoneSelected} className={'btn btn-primary start-button shadow me-3' + (zone.zone === "storefront" ? " active" : "")}>Para la tienda</button>
                    <button id='checkout' onClick={handleEditZoneSelected} className={'btn btn-primary start-button shadow ms-3' + (zone.zone === "checkout" ? " active" : "")}>Checkout</button>
            </div>
            <div id="titleContainer" className='pb-4 pt-4 mb-3 mt-5 w-100'>
                <h2 className='main-title mb-0'>{zone.zoneTitle}</h2>
            </div>
            {zone.zone === "storefront" ?
            <>
                
                    <Box component={<Items/>}/>
                    <Box component={<DetailMain/>}/>
                    <Box component={<Cart/>}/>
                    <Box component={<DetailModal/>}/>          
                    <button onClick={verInfoTotal}>Ver objeto en consola</button>
                    <Link type="submit" to="/result-storefront" className="btn btn-primary font-monospace fs-6 ms-4">&#60; Ver código &#62;</Link>

            </>
            :
                <EditCheckout/>
            }

        </section>
        </>
    )
}

export default EditZone;