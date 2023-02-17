import Footer from './Footer';
import Presentation from './Presentation';
import EditZone from './EditZone/EditZone';
import { useContext } from 'react';
import { OptionZoneContext } from '../context/optionZoneContext';
import { getReport, createReport } from '../firebase/reportFunctions';
import { UserAuth } from '../context/googleAuth';
import { Link } from 'react-router-dom';


const Home = () => {
    const { zone, handleEditZoneSelected } = useContext(OptionZoneContext);
    const { googleSignIn, googleLogOut, user } = UserAuth();

    const handleGoogleSignIn = async () =>{
        try{

            await googleSignIn();

        } catch (error) {
            console.log(error);
        }
    };


    const handleGoogleSignOut = async () =>{
        try{

            await googleLogOut();

        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <>
            <Presentation zone={zone}/>
            <div className='d-flex bg-light'>
                <EditZone zone={zone} handleEditZoneSelected={handleEditZoneSelected}/>
                <Footer color="light"/>
            </div>
            <div className='container-user-nav fixed-bottom-right background-light blur d-flex shadow'>
                {user?.displayName ? (
                    <>
                        <div className='log-out-container d-flex'>
                            <button id='logout-button' onClick={handleGoogleSignOut} className="btn log-button">Cerrar sesión</button>
                        </div>
                        <div className='user-image-container'>
                            {user.photoURL ? 
                                (
                                    <img className='user-image' src={user.photoURL} alt="Foto de perfil de usuario" referrerPolicy="no-referrer"></img>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person d-flex h-100 me-2" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                                    </svg>
                                )
                            }
                        </div>
                    </>
                ) : (
                    <>
                        <div className='log-out-container d-flex'>
                            <button id='signin-button' className='btn log-button' onClick={handleGoogleSignIn}>Iniciar sesión</button>
                        </div>
                        <div className='user-image-container'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person d-flex h-100 me-2" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                            </svg>
                        </div>
                    </>
                )}
            </div>
        </>
        
    )
}

export default Home;