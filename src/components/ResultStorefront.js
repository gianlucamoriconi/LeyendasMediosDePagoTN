import Footer from './Footer';
import CopyToClipboard from './CopyToClipboard';
import { useContext, useState } from 'react';
import { OptionsContextObject } from '../context/optionsContextObject';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ThemeTemplate from './ThemeTemplate';
import { Link } from "react-router-dom";



const Result = () => {
    const [themeSelection, setThemeSelection] = useState('amazonas');
    const { totalSelection } = useContext(OptionsContextObject);
    window.scrollTo({top: 0, behavior: 'smooth'});

    const handleChange = (e) =>{
        setThemeSelection(e.target.value);
    };

    return (
        <div className='bg-light overflow-hidden'>
            <Link to='/' className='btn btn-secondary position-fixed'>Volver</Link>
            <div className='p-5 d-flex flex-wrap m-auto max-width-900'>
                <div id="titleContainer" className='pb-4 pt-4 mb-3 mt-5 w-100'>
                    <h2 className='main-title mb-0'>Copiá y pegá este código</h2>
                    <p>para luego copiar el código que corresponde a tu diseño.</p>
                    <p>Una vez que lo copies, pegalo en <strong><i>Configuraciones &gt; Códigos de tracking (Para la tienda)</i>.</strong></p>
                </div>
                <div className='w-100 mb-4'>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Diseños</FormLabel>
                            <RadioGroup
                                id="theme-radio" 
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                defaultValue="amazonas"
                                value={themeSelection}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="amazonas" control={<Radio />} label="Amazonas" />
                                <FormControlLabel value="atlantico" control={<Radio />} label="Atlántico" />
                                <FormControlLabel value="idea" control={<Radio />} label="Idea" />
                                <FormControlLabel value="lifestyle" control={<Radio />} label="Lifestyle" />
                                <FormControlLabel value="material" control={<Radio />} label="Material" />
                                <FormControlLabel value="silent" control={<Radio />} label="Silent" />
                                <FormControlLabel value="simple" control={<Radio />} label="Simple" />
                                <FormControlLabel value="trend" control={<Radio />} label="Trend" />
                            </RadioGroup>
                    </FormControl>
                </div>
                <div className='w-100 background-grey p-3 max-width-900'>
                    <div className='position-relative'>
                        <pre className="text-to-copy"> 
                        {<ThemeTemplate theme={themeSelection}/>}
                        </pre>
                        <CopyToClipboard/>
                    </div>
                </div>
            </div>
            <Footer color="light"/>
        </div>     

    )
}

export default Result;