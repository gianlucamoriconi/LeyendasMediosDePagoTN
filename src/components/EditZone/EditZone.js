import Items from './Zones/Items';
import Box from '../resources/Box';
import DetailMain from './Zones/DetailMain';
import DetailModal from './Zones/DetailModal';
import EditCheckout from './Zones/EditCheckout';
import Cart from './Zones/Cart';
import { Link } from "react-router-dom";
import { OptionsContextObject } from '../../context/optionsContextObject';
import { useContext } from 'react';



const EditZone = ({zone}) => {

    const { seeObject } = useContext(OptionsContextObject);
    
    return (
        <>
        <section id="editZone" className='col p-md-5 p-3 d-flex flex-wrap m-auto max-width-900 overflow-hidden'>
            <div id="titleContainer" className='pb-4 pt-4 mb-3 mt-5 w-100'>
                <h2 className='main-title mb-0'>{zone.zoneTitle}</h2>
            </div>
            {zone.zone === "storefront" ?
                <>
                <Box component={<Items/>}/>
                <Box component={<DetailMain/>}/>
                <Box component={<Cart/>}/>
                <Box component={<DetailModal/>}/>          
                <button onClick={seeObject}>Ver objeto en consola</button>
                <Link to="/result" className="btn btn-primary font-monospace fs-6 ms-4">&#60; Ver código &#62;</Link>
                </>
            :
                <Box component={<EditCheckout/>}/>
            }

        </section>
        </>
    )
}

export default EditZone;