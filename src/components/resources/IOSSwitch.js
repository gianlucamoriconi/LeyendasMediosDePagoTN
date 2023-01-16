import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import { useContext } from 'react';
import { OptionsContextCheckout } from '../../context/optionsContextCheckout';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? 'var(--primary)' : 'var(--primary)',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


const IOSSwitcher = ({object, onOff}) => {

  const { 
    mercadopago_transparent_card,
    mercadopago_redirect,
    mercadopago_transparent_offline,
    UALA_PROD,
    custom_payment_wire_transfer_production,
    custom_payment_cash_production,
    custom_payment_other_production
  } = useContext(OptionsContextCheckout);

  
  


  return(
  <>
      <FormControlLabel onChange={(e) => onOff(e)}
      control={<IOSSwitch id={object.id} defaultChecked={object.dataContext.display}/>}
      label={null}
      />
  </>

  )

};

export default IOSSwitcher;