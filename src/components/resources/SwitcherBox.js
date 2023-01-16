import { useContext, useState } from 'react';
import { OptionsContextObject } from '../../context/optionsContextObject';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import IOSSwitcher from '../resources/IOSSwitch';
import PaymentChoContent from '../resources/PaymentChoContent';


const SwitcherBox = ({content, changeValueTextPayment}) => {

    const [ switcherDisplay, setSwitcherDisplay ] = useState(content.dataContext.display);    


    const contentShowOrHide = (e) =>{
        if (switcherDisplay === true){
            setSwitcherDisplay(false);

        }

        else{
            setSwitcherDisplay(true);

        }
    };

    const handleChangeText = (e) =>{
        const switchElement = e.target;
        let entry = switchElement.closest(`div#${content.id}`);
        entry = entry.querySelector(`input#${content.id}[type='text']`).value;
        changeValueTextPayment(content.id, entry);
    }

    return(
    <div key={content.id} id={content.id} className='payment-method d-flex flex-wrap w-100 p-3 mb-4 shadow-sm border rounded'>
        <div className='payment-header d-flex w-100 justify-content-between'>
            <div className='payment-title-container d-flex'>
                <div className='payment-name-container'>
                    {content.paymentName}
                </div>
                {content.img !== null ?
                <div className='payment-img-container'>
                    <img className='payment-img ms-3' alt={'Logo de ' + content.paymentName} src={content.img}/>
                </div>
                : null
                }
            </div>
            <div className='payment-switch-container'>
                <Stack direction="row" spacing={1} alignItems="center">
                    <IOSSwitcher object={content} onOff={contentShowOrHide} inputProps={{ 'aria-label': 'iOS design' }}/>
                </Stack>
            </div>
        </div>
        {switcherDisplay === true ? <PaymentChoContent objectContent={content} handleChangeText={handleChangeText}/> : null}
    </div>
    )

};

export default SwitcherBox;