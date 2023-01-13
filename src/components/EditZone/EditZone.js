import Items from './Zones/Items';
import Box from '../resources/Box';
import DetailMain from './Zones/DetailMain';
import DetailModal from './Zones/DetailModal';
import Cart from './Zones/Cart';
import { Link } from "react-router-dom";
import { OptionsContextObject } from '../../context/optionsContextObject';
import { useContext } from 'react';



const EditZone = ({zone, zoneTitle}) => {
    const { seeObject } = useContext(OptionsContextObject);

    return (
        <>
        <div id="editZone" className='col p-5 d-flex flex-wrap m-auto max-width-900'>
            <div className='pb-4 pt-4 mb-3 w-100'>
                <h2 className='main-title mb-0'>{zoneTitle}</h2>
            </div>
            <Box component={<Items/>}/>
            <Box component={<DetailMain/>}/>
            <Box component={<Cart/>}/>
            <Box component={<DetailModal/>}/>          
            <button onClick={seeObject}>Ver objeto en consola</button>
            <Link to="/result" className="btn btn-primary font-monospace fs-6 ms-4">&#60; Ver código &#62;</Link>
        </div>
        </>
    )
}

export default EditZone;