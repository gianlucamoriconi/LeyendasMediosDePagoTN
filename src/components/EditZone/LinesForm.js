import { IoIosAddCircleOutline } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import { useState, useContext } from 'react';
import { OptionsContextObject } from '../../context/optionsContextObject';
import Form from 'react-bootstrap/Form';


const LinesForm = (props) => {

    const {zone} = props;
    const [lines, setLines] = useState([]);
    const { handleAddLineInObject,
            handleRemoveLineInObject,
            zonesInfo
        } = useContext(OptionsContextObject);

    
    const getObject = (e) =>{
        let place = e.target.closest(".container-lines-config");
        place = place.getAttribute("id");
        const lineChangingId = e.target.closest(".line-config").getAttribute("id");
        const typefield = e.target.closest(".line-config").getAttribute("data-type");
        const paymentMethod = e.target.closest(".line-config").querySelector("#paymentMethod").value;

        var lineObjectToAdd = {
            typefield: typefield || '',
            id: Number(lineChangingId) || '',
            place: place || '',
            paymentMethod: paymentMethod || '',
        }

        if (typefield === "installments") {
            const interest = e.target.closest(".line-config").querySelector(".interest-select").value;
            const installments = e.target.closest(".line-config").querySelector("#installments").value;

            lineObjectToAdd.interest = interest;
            lineObjectToAdd.installments = installments;
        }

        else if (typefield === "discount") {
            const numberInput = e.target.closest(".line-config").querySelector("#numberInput").value;
            lineObjectToAdd.discountPercentage = numberInput;
        }
        
        return lineObjectToAdd;
    }
    

    const addNewLineInstallment = (e) =>{
        let place = e.target.closest(".container-lines-config");
        place = place.getAttribute("id");
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
            place: place, 
            id: id, 
            typefield:"installments", 
            installments:"", 
            paymentMethod:"",
            interest: "",
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
            paymentMethod:"",
            discountPercentage: ""
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

            <>
                {zonesInfo[zone].map((line) =>{
                        if (line.typefield === "installments"){
                            return(
                                <div key={line.id} id={line.id} data-type={line.typefield} className="d-flex line-config flex-wrap pb-3 mb-4 border-bottom">
                                    <div className='d-flex col-11 flex-wrap pe-2 pe-md-0'>
                                        <div className='d-flex col-12 col-md-6 pb-2 pb-md-0 pe-md-3'>
                                            <Form.Group className="w-100 pe-3" controlId="installments">
                                                <Form.Control value={line.installments > 0 ? line.installments : '' } data-id={line.id} type="number" required placeholder="Número de cuota" onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Select className='interest-select w-100' aria-label='interest-select' onChange={handleChange}>
                                                <option data-id={line.id} className='interest-option' value={false}>sin interés</option>
                                                <option data-id={line.id} className='interest-option' value={true}>con interés</option>
                                            </Form.Select>
                                        </div>
                                        <div className='d-flex col-12 col-md-6'>
                                            <Form.Group className="w-100" controlId="paymentMethod">
                                                <Form.Control value={line.paymentMethod || ''} data-id={line.id} type="text" required placeholder="Medio de pago (opcional)" onChange={handleChange} />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className='d-flex col-1 justify-content-end'>
                                        <button id={line.id} type="button" className='trash-button border-0 rounded p-1' onClick={(e) => removeLine(e)}><BsTrash style={{pointerEvents:'none'}}/></button>
                                    </div>
                                </div>
                            )
                        }

                        else if (line.typefield === "discount"){
                            return(
                            <div key={line.id} id={line.id} data-type={line.typefield} className="d-flex line-config flex-wrap pb-3 mb-4 border-bottom">
                                    <div className='d-flex col-11 flex-wrap pe-2 pe-md-0'>
                                    <div className='col-3 pe-3'>
                                        <Form.Group className="w-100" controlId="numberInput">
                                            <Form.Control value={line.discountPercentage > 0 ? line.discountPercentage : '' } data-id={line.id} type="number" required placeholder="Porcentaje de descuento (sin %)" onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-9'>
                                        <Form.Group className="w-100" controlId="paymentMethod">
                                            <Form.Control value={line.paymentMethod || ''} data-id={line.id} type="text" required placeholder="Nombre del medio de pago" onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    </div>
                                <div className='d-flex col-1 justify-content-end'>
                                    <button id={line.id} type="button" className='trash-button border-0 rounded p-1' onClick={(e) => removeLine(e)}><BsTrash style={{pointerEvents:'none'}}/></button>
                                </div>
                            </div>)
                        }

                        else {
                            return (console.log("Is not a installment and not a discount"))
                        }

                    })
                }
                <div className='d-flex w-100'>
                    <div className='col-6 pe-3'>
                        <button onClick={(e) => addNewLineInstallment(e)} className='btn btn-primary add-line-button shadow-sm w-100 ps-1 pe-1 border-0'><IoIosAddCircleOutline className="add-circle"/>Cuotas sin interés</button>
                    </div>
                    <div className='col-6'>
                        <button onClick={(e) => addNewLineDiscount(e)} className='btn btn-primary add-line-button shadow-sm w-100 ps-1 pe-1 border-0'><IoIosAddCircleOutline className="add-circle"/>Descuento</button>
                    </div>
                </div>

            </>
    )
}

export default LinesForm;