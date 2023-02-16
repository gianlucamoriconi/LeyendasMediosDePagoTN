import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../../context/googleAuth';
import { Link } from 'react-router-dom';


const SignIn = () => {
    
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

    return(
        <div className='min-vh-100 p-5 d-flex flex-wrap justify-content-center'>
            <div id="titleContainer" className="pb-4 pt-4 mb-3 mt-5 w-100 text-center">
                <h2 className="main-title mb-0">Iniciá sesión con Google</h2>
            </div>
            <div>
                {user?.displayName ? (
                    <button onClick={handleGoogleSignOut}>Cerrar sesión</button>
                ) : (
                    <Link to="/login">Iniciar sesión</Link>
                )}
                <GoogleButton onClick={handleGoogleSignIn}/>

            </div>
        </div>
    )
}

export default SignIn;