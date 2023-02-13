import Footer from './Footer';
import Presentation from './Presentation';
import EditZone from './EditZone/EditZone';
import { useContext } from 'react';
import { OptionZoneContext } from '../context/optionZoneContext';
import { getReport, createReport } from '../firebase/reportFunctions';

const Home = () => {
    const { zone, handleEditZoneSelected } = useContext(OptionZoneContext);

    return (
        <>
            <Presentation zone={zone}/>
            <div className='d-flex bg-light'>
                <EditZone zone={zone} handleEditZoneSelected={handleEditZoneSelected}/>
                <Footer color="light"/>
            </div>
        </>
        
    )
}

export default Home;