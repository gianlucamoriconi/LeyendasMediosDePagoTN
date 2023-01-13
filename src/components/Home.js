// import { Link } from 'react-router-dom';
import Footer from './Footer';
import BottomMenu from './BottomMenu';
import Menu from './Menu';
import Presentation from './Presentation';
import EditZone from './EditZone/EditZone';
import { useState } from 'react';


const Home = () => {
    const [zoneTitle, setTitle] = useState("Para la tienda");
    const [zone, setZone] = useState("Para la tienda");

    return (
        <>
            <Presentation/>
            <div className='d-flex bg-light'>
                {/* <Menu backButton={false} /> */}
                <EditZone zone={zone} zoneTitle={zoneTitle}/>
                {/* <BottomMenu/> */}
                <Footer color="light"/>
            </div>
        </>
        
    )
}

export default Home;