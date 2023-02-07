import { IoIosAddCircleOutline } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useContext } from 'react';
import { OptionsContextObject } from '../../context/optionsContextObject';
import Form from 'react-bootstrap/Form';
import {imagesPaymentOptions} from '../../payments/imagesPaymentOptions';

const DetailOptionEditor = (props) => {
    const { paymentTab, savedId, idSelector, switcherOnOff } = props;
    const [boxesInDetail, setBoxesInDetail] = useState([]);

    const { payments, handleAddBoxInObject, handleRemoveBoxInObject } = useContext(OptionsContextObject);

    const addNewBoxInstallment = () => {
        var id = "";
        let idsArray = [];
        payments[savedId].map((box) =>(
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
            idSelector: idSelector,
            interest: false
        }

        setBoxesInDetail([...boxesInDetail, newBox]);
        handleAddBoxInObject(savedId, newBox);
    };



    const getObject = (e) =>{

        const boxChangingId = e.target.closest(".box-config").getAttribute("id");
        const numberInput = e.target.closest(".box-config").querySelector("#numberInput").value;
        const interest = e.target.closest(".box-config").querySelector(".interest-select").value;
        var imagesSelected = [];

        const imagesSelectContainer = e.target.closest(".box-config").querySelector(".images-select").querySelectorAll(".image-box-option");

        imagesSelectContainer.forEach(element => {
            const input = element.querySelector("input");
            const dataImage = element.querySelector("input").getAttribute("data-image");

            if (input.checked === true) {
                imagesSelected.push(JSON.parse(dataImage));
            }
        });

        console.log(imagesSelected);

        const boxObjectToAdd = {
            id: Number(boxChangingId) || '',
            savedId: savedId || '',
            numberInstallment: Number(numberInput) || '',
            interest: interest,
            idSelector: idSelector,
            images: imagesSelected
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

    const handleVisualChangeCheckboxImage = (e) =>{
        if (e.target.checked === false) {
            e.target.closest(".image-box-option").classList.remove("active");
        }

        else{
            e.target.closest(".image-box-option").classList.add("active");
        }
    };

    return (

            <div>
                <Box className='mb-4 d-flex flex-wrap mt-3'
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {payments[savedId].map((box) =>{

                            return(
                            <div key={box.id} id={box.id} className="d-flex flex-wrap col-12 box-config w-100 ps-2 pe-2 pt-4 pb-4 mb-4 border-bottom" data-type={box.savedId}>
                                <div className='d-flex flex-wrap col-11'>
                                    <div className='d-flex col-12 w-100 mb-3'>
                                        <Form.Group className="col-4 pe-2" controlId="numberInput">
                                            <Form.Control value={box.numberInstallment > 0 ? box.numberInstallment : '' } data-id={box.id} type="number" required placeholder="Ej: 6" onChange={handleChange} />
                                        </Form.Group>
                                        <Form.Group className="col-8 pe-2" controlId="interest-select">
                                            <Form.Select className='interest-select' aria-label='interest-select' onChange={handleChange}>
                                                <option data-id={box.id} className='interest-option' value={false}>sin interés</option>
                                                <option data-id={box.id} className='interest-option' value={true}>con interés</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <div className='d-flex col-12'>
                                        <Form.Group className="d-flex flex-wrap col-12 pe-2 images-select">
                                            {imagesPaymentOptions.map((paym) => {
                                                return (<Form.Check
                                                            key={paym.name}
                                                            data-image={JSON.stringify(paym)}
                                                            className={'image-box-option shadow-sm p-0 rounded ' + paym.name}
                                                            data-id={box.id}
                                                            inline
                                                            label={paym.name}
                                                            name="group1"
                                                            type="checkbox"
                                                            id={paym.name}
                                                            onChange={handleChange}
                                                            onClick={handleVisualChangeCheckboxImage}
                                                            style={{backgroundImage: `url(${paym.image})`}}
                                                        />)
                                            })}


                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='d-flex col-1 justify-content-end'>
                                    <button id={box.id} type="button" className='trash-button border-0 rounded p-1' onClick={(e) => removeBox(e)}><BsTrash style={{pointerEvents:'none'}}/></button>
                                </div>
                            </div>
                            )
                    })}
                </Box>
                <button onClick={(e) => addNewBoxInstallment()} className='btn btn-primary shadow add-line-button me-3'><IoIosAddCircleOutline className="add-circle"/>Nueva financiación</button>
            </div>
    )
}

export default DetailOptionEditor;