
import { BiCopy } from 'react-icons/bi';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import { useEffect, useState } from 'react';


const CopyToClipboard = () =>{

    /*
        Estados del boton de copiar código:
        - "ready" significa que está disponible para ser cliqueado
        - "done" significa que hicimos click sobre el boton y mostramos que el texto fue copiado.
        Dura unos pocos segundos.

    */
    const [copyIcon, setCopyIcon] = useState(<BiCopy/>);

    const textToCopy = (e) =>{
        console.log(e.target.tagName);
        let eventTagName = e.target.tagName.toLowerCase();
        let textToCopy = [];

        if (eventTagName !== "button"){
            textToCopy = e.target.closest("button");
        } else{
            textToCopy = e.target;
        }
        

        textToCopy = textToCopy.previousSibling.textContent;
        navigator.clipboard.writeText(textToCopy);
        console.log(textToCopy);
        setCopyIcon(<HiOutlineClipboardDocumentCheck/>);

        setTimeout( ()=> {
            setCopyIcon(<BiCopy/>);
        }, 2000);
    }

    


    return (
        <button onClick={(e) => {textToCopy(e)}} className='copy-to-clipboard background-grey shadow-sm border-0 p-2 position-absolute btn'>{copyIcon}</button>
    )
}

export default CopyToClipboard;