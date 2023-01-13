import { IoIosAddCircleOutline } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useContext } from 'react';
import { OptionsContextObject } from '../../context/optionsContextObject';

const DetailOptionEditor = (props) => {
    const { paymentTab, savedId, idSelector } = props;
    const [boxesInDetail, setBoxesInDetail] = useState([]);

    const { handleAddBoxInObject,
            handleRemoveBoxInObject,
            totalSelectionModal
        } = useContext(OptionsContextObject);


    const addNewBoxInstallment = () => {
        var id = "";
        let idsArray = [];
        totalSelectionModal[savedId].map((box) =>(
            idsArray.push(box.id)
        ));

        if (idsArray.length > 0){
            let maxId = idsArray.sort((a,b)=> a-b)[idsArray.length-1];
            id = maxId + 1;
            
        } else{
            id = 1;
        }


        const newBox = {
            id: id,
            savedId: savedId,
            numberInstallment:"",
            idSelector: idSelector
        }

        setBoxesInDetail([...boxesInDetail, newBox]);
        handleAddBoxInObject(savedId, newBox);
    };



    const getObject = (e) =>{
        const boxChangingId = e.target.closest(".box-config").getAttribute("id");
        const numberInput = e.target.closest(".box-config").querySelector("#numberInput").value;

        const boxObjectToAdd = {
            id: Number(boxChangingId) || '',
            savedId: savedId || '',
            numberInstallment: Number(numberInput) || '',
            idSelector: idSelector
        }

        return boxObjectToAdd;
    }

    const handleChange = (e) =>{
        const boxObjectToAdd = getObject(e);
        handleAddBoxInObject(savedId, boxObjectToAdd);
    };

    const removeBox = (e) =>{
        e.preventDefault();
        let idToDelete = Number(e.target.id);
        setBoxesInDetail([...boxesInDetail.filter((box) => box.id !== idToDelete)]); 
        handleRemoveBoxInObject(savedId, idToDelete);
    };


    return (

            <div>
                <Box className='mb-4'
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {totalSelectionModal[savedId].map((box) =>{

                            return(<div key={box.id} id={box.id} data-type={box.savedId} className="d-flex box-config">
                                <TextField
                                    value={box.numberInstallment > 0 ? box.numberInstallment : '' }
                                    required
                                    id="numberInput"
                                    label="Número de cuotas"
                                    type="number"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="filled"
                                    onChange={handleChange}
                                />
                                <button id={box.id} type="button" className='btn trash-button' onClick={(e) => removeBox(e)}><BsTrash style={{pointerEvents:'none'}}/></button>
                            </div>)
                    })}
                </Box>
                <button onClick={(e) => addNewBoxInstallment()} className='btn btn-primary shadow add-line-button me-3'><IoIosAddCircleOutline className="add-circle"/>Nueva financiación</button>
            </div>
    )
}

export default DetailOptionEditor;