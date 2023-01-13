import Footer from './Footer';
import CopyToClipboard from './CopyToClipboard';
import Menu from './Menu';
import { useContext, useState } from 'react';
import { OptionsContextObject } from '../context/optionsContextObject';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ThemeTemplate from './ThemeTemplate';


const Result = () => {
    const [themeSelection, setThemeSelection] = useState('amazonas');
    const { totalSelection } = useContext(OptionsContextObject);
    window.scrollTo({top: 0, behavior: 'smooth'});

    const handleChange = (e) =>{
        setThemeSelection(e.target.value);
    };

    return (
        <div className='d-flex bg-light'>
            <Menu backButton={true}/>
            
            <div className='col-9 p-5 d-flex flex-wrap ms-auto'>
                <div className='mb-5 mt-3'>
                    <div className='mb-4'>
                        <h3>Elegí el diseño que usás</h3>
                        <p>para luego copiar el código que corresponde a tu diseño.</p>
                    </div>
                    <div>
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
                                </RadioGroup>
                        </FormControl>
                    </div>
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