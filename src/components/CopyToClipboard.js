
import { BiCopy } from 'react-icons/bi';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import { useState } from 'react';


const CopyToClipboard = () =>{

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