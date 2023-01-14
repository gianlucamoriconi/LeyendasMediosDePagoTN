// import { Link } from 'react-router-dom';
import Footer from './Footer';
import BottomMenu from './BottomMenu';
import Menu from './Menu';
import Presentation from './Presentation';
import EditZone from './EditZone/EditZone';
import { useEffect, useState, useContext } from 'react';
import { OptionZoneContext } from '../context/optionZoneContext';



const Home = () => {
    const { zone, handleEditZoneSelected } = useContext(OptionZoneContext);

    return (
        <>
            <Presentation zone={zone} handleEditZoneSelected={handleEditZoneSelected}/>
            <div className='d-flex bg-light'>
                <EditZone zone={zone}/>
                <Footer color="light"/>
            </div>
        </>
        
    )
}

export default Home;