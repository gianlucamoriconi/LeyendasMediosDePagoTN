import { IoIosAddCircleOutline } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useContext } from 'react';
import { OptionsContextObject } from '../../context/optionsContextObject';

const LinesForm = (props) => {
    const {zone} = props;
    const [lines, setLines] = useState([]);
    const { handleAddLineInObject,
            handleRemoveLineInObject,
            totalSelection,
            isInObject
        } = useContext(OptionsContextObject);

    
    const getObject = (e) =>{
        let place = e.target.closest(".container-lines-config");
        place = place.getAttribute("id");
        const lineChangingId = e.target.closest(".line-config").getAttribute("id");
        const typefield = e.target.closest(".line-config").getAttribute("data-type");
        const numberInput = e.target.closest(".line-config").querySelector("#numberInput").value;
        const paymentMethodInput = e.target.closest(".line-config").querySelector("#paymentMethodInput").value;

        const lineObjectToAdd = {
            typefield: typefield || '',
            id: Number(lineChangingId) || '',
            place: place || '',
            numberInput: Number(numberInput) || '',
            paymentMethodInput: paymentMethodInput || '',
        }

        return lineObjectToAdd;
    }

    

    const addNewLineInstallment = (e) =>{
        let atributeOfContainerLine = e.target.closest(".container-lines-config");
        atributeOfContainerLine = atributeOfContainerLine.getAttribute("id");
        var id = "";
        let idsArray = [];
        lines.map((line) =>(
            idsArray.push(line.id)
        ));

        if (idsArray.length > 0){
            let maxId = idsArray.sort((a,b)=> a-b)[idsArray.length-1];
            id = maxId + 1;
            
        } else{
            id = 1;
        }


        const newLine = {
            place: atributeOfContainerLine, 
            id: id, 
            typefield:"installments", 
            installments:"", 
            paymentMethod:""
        }

        setLines([...lines, newLine]);

        handleAddLineInObject(zone, newLine);

    }

    const addNewLineDiscount = (e) =>{
        var id = "";
        let idsArray = [];
        lines.map((line) =>(
            idsArray.push(line.id)
        ));

        if (idsArray.length > 0){
            let maxId = idsArray.sort((a,b)=> a-b)[idsArray.length-1];
            id = maxId + 1;
            
        } else{
            id = 1;
        }

        const newLine = {
            id: id,
            typefield:"discount",
            installments:"",
            paymentMethod:""
        }
        setLines([...lines, newLine]);
        
        handleAddLineInObject(zone, newLine);

    }

    const handleChange = (e) =>{
        const lineObjectToAdd = getObject(e);
        handleAddLineInObject(zone, lineObjectToAdd);
    }

    const removeLine = (e) =>{
        e.preventDefault();
        let idToDelete = Number(e.target.id);
        setLines([...lines.filter((line) => line.id !== idToDelete)]); 
        handleRemoveLineInObject(zone, idToDelete);
    }


    return (

            <div>
                <Box className='mb-4 w-100'
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {totalSelection[zone].map((line, index) =>{

                        if (line.typefield === "installments"){
                            return(<div key={line.id} id={line.id} data-type={line.typefield} className="d-flex line-config flex-wrap">
                                <TextField
                                    value={line.numberInput > 0 ? line.numberInput : '' }
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
                                <TextField
                                value={line.paymentMethodInput || ''}
                                required
                                label="Nombre del medio de pago"
                                id="paymentMethodInput"
                                onChange={handleChange}
                                />
                                <button id={line.id} type="button" className='btn trash-button' onClick={(e) => removeLine(e)}><BsTrash style={{pointerEvents:'none'}}/></button>
                            </div>)
                        }

                        else if (line.typefield === "discount"){
                            return(<div key={line.id} id={line.id} data-type={line.typefield} className="d-flex line-config flex-wrap fade-in-up">
                                <TextField
                                    value={line.numberInput > 0 ? line.numberInput : '' }
                                    required
                                    id="numberInput"
                                    label="Porcentaje de descuento (sin %)"
                                    type="number"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="filled"
                                    onChange={handleChange}
                                />
                                <TextField
                                value={line.paymentMethodInput || ''}
                                required
                                label="Nombre del medio de pago"
                                id="paymentMethodInput"
                                onChange={handleChange} 
                                />
                                <button id={line.id} type="button" className='btn trash-button' onClick={(e) => removeLine(e)}><BsTrash style={{pointerEvents:'none'}}/></button>
                            </div>)
                        }

                    })}
                </Box>
                <div className='d-flex w-100'>
                    <div className='col-6 pe-3'>
                        <button onClick={(e) => addNewLineInstallment(e)} className='btn btn-primary add-line-button w-100'><IoIosAddCircleOutline className="add-circle"/>Cuotas sin interés</button>
                    </div>
                    <div className='col-6'>
                        <button onClick={(e) => addNewLineDiscount(e)} className='btn btn-primary add-line-button w-100'><IoIosAddCircleOutline className="add-circle"/>Descuento</button>
                    </div>
                </div>

            </div>
    )
}

export default LinesForm;