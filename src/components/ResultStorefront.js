import Footer from './Footer';
import CopyToClipboard from './CopyToClipboard';
import { useContext, useState, useEffect } from 'react';
import { OptionsContextObject } from '../context/optionsContextObject';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ThemeTemplate from './ThemeTemplate';
import { Link } from "react-router-dom";



const Result = () => {
    const [themeSelection, setThemeSelection] = useState('amazonas-light');
    const [title, setTitle] = useState('No detectamos que hayas elegido hacer cambios');
    const [selectionIsEmpty, setSelectionIsEmpty] = useState(true)
    const { totalSelection } = useContext(OptionsContextObject);
    window.scrollTo({top: 0, behavior: 'smooth'});

    const verInfoTotal = () => {
        console.log(totalSelection);
    }

    const handleChange = (e) =>{
        setThemeSelection(e.target.value);
    };

    useEffect(() => {
        if (JSON.stringify(totalSelection) === '{}') {
            setSelectionIsEmpty(true);
            setTitle("No detectamos que hayas elegido hacer cambios");
        }

        else{
            setSelectionIsEmpty(false);
            setTitle("Elegí tu diseño y luego copiá el código");
        }

        console.log(totalSelection);
    }, [totalSelection]);

    
    return (
       <> 
        <div className='bg-light overflow-hidden'>
            <Link to='/' className='btn btn-secondary position-fixed'>Volver</Link>
            <div className='p-5 d-flex flex-wrap m-auto max-width-900'>
        {!selectionIsEmpty ? 
            <>
                <div id="titleContainer" className='pb-4 pt-4 mb-3 mt-5 w-100'>
                    <h2 className='main-title mb-3'>{title}</h2>
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
                                <FormControlLabel value="amazonas-light" control={<Radio />} label="Amazonas (íconos finos)" />
                                <FormControlLabel value="amazonas-solid" control={<Radio />} label="Amazonas (íconos gruesos)" />
                                <FormControlLabel value="atlantico" control={<Radio />} label="Atlántico" />
                                <FormControlLabel value="idea" control={<Radio />} label="Idea" />
                                <FormControlLabel value="lifestyle" control={<Radio />} label="Lifestyle" />
                                <FormControlLabel value="material" control={<Radio />} label="Material" />
                                <FormControlLabel value="silent" control={<Radio />} label="Silent" />
                                <FormControlLabel value="simple" control={<Radio />} label="Simple" />
                                <FormControlLabel value="trend" control={<Radio />} label="Trend" />
                                <FormControlLabel value="rio" control={<Radio />} label="Río" />
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
                <button onClick={verInfoTotal}>Ver objecto en consola</button>
            </>
        :
        <div id="titleContainer" className='pb-4 pt-4 mb-3 mt-5 w-100'>
            <h2 className='main-title mb-4'>{title}</h2>
            <p>Volvé a la página de edición y elegí los cambios que querés hacer para poder generar el código.</p>
            <div>
                <Link to='/' className='btn btn-primary m-auto'>Ir a la edición</Link>
            </div>
        </div>
        }
        </div>
            <Footer color="light"/>
        </div> 
        </>
    )
}

export default Result;