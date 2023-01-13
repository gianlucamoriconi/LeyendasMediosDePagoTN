import { useState } from "react";
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import DetailOptionEditor from "./EditZone/DetailOptionEditor";
import { useContext } from 'react';
import { OptionsContextObject } from '../context/optionsContextObject';


const SwitcherControl = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));



const Switcher = (props) => {
    const { setValues, labelName, defaultCheckedValue, savedId, idSelector } = props;
    const [switcherDefault, setSwitcherDefault]= useState(defaultCheckedValue);
    const [switcherOnOff, setSwitcherOnOff]= useState(defaultCheckedValue);

    const {totalSelectionModal} = useContext(OptionsContextObject);

    const contentShowOrHide = (e) =>{
        if (switcherOnOff === true){
          setSwitcherOnOff(false);
          setValues([]);
        }

        else{
          setSwitcherOnOff(true)
        }
    };

    //Creamos el id del content en base al label
    let idOfContent = savedId.toLowerCase();
    idOfContent = idOfContent + "-content";


    return(
    <>
        <FormControlLabel className="mb-2 label-fw-light" onChange={(e) => contentShowOrHide(e)}
        control={<SwitcherControl defaultChecked={switcherDefault} />}
        label={labelName}
        />
        <div id={savedId} className={switcherOnOff === true ? "d-block content mb-4" : "d-none content"}>
            Contenido {labelName}
            <DetailOptionEditor paymentTab={labelName} savedId={savedId} idSelector={idSelector}/>
        </div>
    </>

    )

};

export default Switcher;