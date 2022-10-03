// import { Link } from 'react-router-dom';
import Footer from './Footer';

let path = window.location.pathname.split('/');
console.log(path);
console.log(window.location.href);
let code = window.location.href
code = code.replace(window.location.origin, "");
code = code.replace("/?code=", "");
console.log(code);

fetch('https://www.tiendanube.com/apps/authorize/token', {
  method: "POST",
  body: JSON.stringify({
    "client_id": 5538,
    "client_secret": "5f33e97fdb2e09ec35c876557bcddf4f8e87c3bcaa63573b",
    "grand_type": "authorization_code",
    "code": code 
  }),
  headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json()) 
.then(json => console.log(json));


const Home = () => {
    return (
        <div className='d-flex bg-dark'>
            <div className='col-5 p-5 hv-100'>
                <div className='h-100'>
                    <h1 className='mb-4 text-light pt-5'>Bienvenido a Tiendanube QR</h1>
                    <p className='text-light'>Elegí una opción para comenzar a crear tus QR</p>
                    <p className='text-light'>Seleccioná todos los productos que quieras y luego hacé click en generar QRs</p>
                </div>
                <Footer color="dark"/>
            </div>

            <div className='col-7 p-5 text-center bg-light'>
                <a className='p-3 me-2'>Todos los productos</a>
                <a className='p-3 me-2'>Por categorías</a>
                <a className='p-3 me-2'>Por productos</a>
            </div>
        </div>
    )
}

export default Home;