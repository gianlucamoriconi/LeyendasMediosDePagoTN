import { createContext, useState } from "react";


export const OptionsContextObject = createContext();

const initItemProducts = JSON.parse(localStorage.getItem('itemProducts')) || [];
const initDetailMain = JSON.parse(localStorage.getItem('detailMain')) || [];
const initCart = JSON.parse(localStorage.getItem('cart')) || [];
const initModalMercadopago = JSON.parse(localStorage.getItem('modalMercadopago')) || [];
const initModalMobbex = JSON.parse(localStorage.getItem('modalMobbex')) || [];
const initModalPagonube = JSON.parse(localStorage.getItem('modalPagonube')) || [];
const initModalUala = JSON.parse(localStorage.getItem('modalUala')) || [];
const initModalModo = JSON.parse(localStorage.getItem('modalModo')) || [];
const initModalDlocal = JSON.parse(localStorage.getItem('modalDlocal')) || [];
const initModalGocuotas = JSON.parse(localStorage.getItem('modalGocuotas')) || [];


export const OptionsProvider = ({children}) => {
    const [itemProducts, setItemProducts] = useState(initItemProducts);
    const [detailMain, setDetailMain] = useState(initDetailMain);
    const [cart, setCart] = useState(initCart);
    const [modalMercadopago, setModalMercadopago] = useState(initModalMercadopago);
    const [modalMobbex, setModalMobbex] = useState(initModalMobbex);
    const [modalPagonube, setModalPagonube] = useState(initModalPagonube);
    const [modalModo, setModalModo] = useState(initModalModo);
    const [modalDlocal, setModalDlocal] = useState(initModalDlocal);
    const [modalGocuotas, setModalGocuotas] = useState(initModalGocuotas);
    const [modalUala, setModalUala] = useState(initModalUala);

    const totalSelectionModal = {
        modalMercadopago: modalMercadopago,
        modalMobbex: modalMobbex,
        modalPagonube: modalPagonube,
        modalUala: modalUala,
        modalModo: modalModo,
        modalDlocal: modalDlocal,
        modalGocuotas: modalGocuotas
    };

    //Dejamos solo los que tienen información
    const totalSelectionModalOptimized = () =>{
        var totalSelectionModalOptimizedObject = [];

        if (modalMercadopago.length > 0) {
            totalSelectionModalOptimizedObject.modalMercadopago = modalMercadopago;
        }

        if (modalModo.length > 0) {
            totalSelectionModalOptimizedObject.modalModo = modalModo;
        }

        if (modalMobbex.length > 0) {
            totalSelectionModalOptimizedObject.modalMobbex = modalMobbex;
        }

        if (modalPagonube.length > 0) {
            totalSelectionModalOptimizedObject.modalPagonube = modalPagonube;
        }

        if (modalUala.length > 0) {
            totalSelectionModalOptimizedObject.modalUala = modalUala;
        }
        
        if (modalDlocal.length > 0) {
            totalSelectionModalOptimizedObject.modalDlocal = modalDlocal;
        }
        
        if (modalGocuotas.length > 0) {
            totalSelectionModalOptimizedObject.modalGocuotas = modalGocuotas;
        }
        
        
        return Object.keys(totalSelectionModalOptimizedObject).length !== 0 ? totalSelectionModalOptimizedObject : [];
    }
    
    


    const totalSelection = {
        itemProducts: itemProducts,
        detailMain: detailMain,
        cart: cart,
        detailModalNew: totalSelectionModalOptimized(),
        detaliModalOld: totalSelectionModal
    };

    const totalSelectionArray = [
        {itemProducts: itemProducts},
        {detailMain: detailMain},
        {cart: cart},
        {detailModalNew: totalSelectionModalOptimized()},
        {detaliModalOld: totalSelectionModal}
    ];

    /* Handlers que construyen los objetos de:
        itemProducts,
        detailMain,
        cart

        Los de detailModal son diferentes, están más abajo.
     */
    const handleAddLineInObject = (place, lineObject) =>{
        if (place === "itemProducts"){
            if (isInObject(lineObject) === true){
                itemProducts.map((line) => {
                    if (line.id === lineObject.id){
                      line.numberInput = lineObject.numberInput;
                      line.paymentMethodInput = lineObject.paymentMethodInput;
                      line.interest = lineObject.interest;
                      
                      return setItemProducts([...itemProducts]);
                    }
                  });
            } else {
                setItemProducts([...itemProducts, lineObject])
            }
        }

        else if (place === "detailMain"){
            if (isInObject(lineObject) === true){
                detailMain.map((line) => {
                    if (line.id === lineObject.id){
                      line.numberInput = lineObject.numberInput;
                      line.paymentMethodInput = lineObject.paymentMethodInput;
                      if (line.interest) {
                        line.interest = lineObject.interest;
                      }
                      setDetailMain([...detailMain]);
                    }
                  });
            } else {
                setDetailMain([...detailMain, lineObject])
            }
        }

        else if (place === "cart"){
            if (isInObject(lineObject) === true){
                cart.map((line) => {
                    if (line.id === lineObject.id){
                      line.numberInput = lineObject.numberInput;
                      line.paymentMethodInput = lineObject.paymentMethodInput;
                      if (line.interest) {
                        line.interest = lineObject.interest;
                      }
                      setCart([...cart]);
                    }
                  });

            } else {
                setCart([...cart, lineObject])
            }
        }

    }

    const handleRemoveLineInObject = (place, lineObjectId) =>{
        if (place === "itemProducts"){
            setItemProducts([...itemProducts.filter((item) => item.id !== lineObjectId)])
        }

        else if (place === "detailMain"){
            setDetailMain([...detailMain.filter((item) => item.id !== lineObjectId)])
        }

        else if (place === "cart"){
            setCart([...cart.filter((item) => item.id !== lineObjectId)])
        }
    }


    /* 
        Chequeo si existe esa misma linea (por su ID) para editarla o crearla:
        itemProducts,
        detailMain,
        cart

        Los de detailModal son diferentes, están más abajo.
     */
    const isInObject = (line) => {
        if (line.place === "itemProducts"){
            return itemProducts.some((item) => item.id === line.id)
        }

        else if (line.place === "detailMain"){
            return detailMain.some((item) => item.id === line.id)
        }

        else if (line.place === "cart"){
            return cart.some((item) => item.id === line.id)
        }
        return cart.some((item) => item.id === line.id)
    }


    /*
        Chequeo si existe esa misma linea en detailModal (por su ID) para editarla o crearla.
     */
    const isInObjectModal = (box) => {
        if (box.savedId === "modalMercadopago"){
            return modalMercadopago.some((item) => item.id === box.id)
        }

        else if (box.savedId === "modalMobbex"){
            return modalMobbex.some((item) => item.id === box.id)
        }

        else if (box.savedId === "modalModo"){
            return modalModo.some((item) => item.id === box.id)
        }

        else if (box.savedId === "modalPagonube"){
            return modalPagonube.some((item) => item.id === box.id)
        }

        else if (box.savedId === "modalDlocal"){
            return modalDlocal.some((item) => item.id === box.id)
        }

        else if (box.savedId === "modalUala"){
            return modalUala.some((item) => item.id === box.id)
        }

        else if (box.savedId === "modalGocuotas"){
            return modalGocuotas.some((item) => item.id === box.id)
        }
    }


    /* Handlers que construye el objeto de detailModal:
        - handleAddBoxInObject
        - handleRemoveBoxInObject
    */

    const handleAddBoxInObject = (payment, boxObject) =>{

        if (payment === "modalMercadopago"){
            if (isInObjectModal(boxObject) === true){
                modalMercadopago.map((box) => {
                    if (box.id === boxObject.id){
                      box.numberInstallment = boxObject.numberInstallment;
                      box.interest = boxObject.interest;
                      setModalMercadopago([...modalMercadopago]);
                    }
                  });
            } else {
                setModalMercadopago([...modalMercadopago, boxObject])
            }
        }

        else if (payment === "modalMobbex"){
            if (isInObjectModal(boxObject) === true){
                modalMobbex.map((box) => {
                    if (box.id === boxObject.id){
                        box.numberInstallment = boxObject.numberInstallment;
                        box.interest = boxObject.interest;
                        setModalMobbex([...modalMobbex]);
                    }
                  });
            } else {
                setModalMobbex([...modalMobbex, boxObject])
            }
        }

        else if (payment === "modalPagonube"){
            if (isInObjectModal(boxObject) === true){
                modalPagonube.map((box) => {
                    if (box.id === boxObject.id){
                        box.numberInstallment = boxObject.numberInstallment;
                        box.interest = boxObject.interest;
                        setModalPagonube([...modalPagonube]);
                    }
                  });

            } else {
                setModalPagonube([...modalPagonube, boxObject])
            }
        }

        else if (payment === "modalUala"){
            if (isInObjectModal(boxObject) === true){
                modalUala.map((box) => {
                    if (box.id === boxObject.id){
                        box.numberInstallment = boxObject.numberInstallment;
                        box.interest = boxObject.interest;
                        setModalUala([...modalUala]);
                    }
                  });

            } else {
                setModalUala([...modalUala, boxObject])
            }
        }


        else if (payment === "modalModo"){
            if (isInObjectModal(boxObject) === true){
                modalModo.map((box) => {
                    if (box.id === boxObject.id){
                        box.numberInstallment = boxObject.numberInstallment;
                        box.interest = boxObject.interest;
                        setModalModo([...modalModo]);
                    }
                  });

            } else {
                setModalModo([...modalModo, boxObject])
            }
        }


        else if (payment === "modalDlocal"){
            if (isInObjectModal(boxObject) === true){
                modalDlocal.map((box) => {
                    if (box.id === boxObject.id){
                        box.numberInstallment = boxObject.numberInstallment;
                        setModalDlocal([...modalDlocal]);
                    }
                  });

            } else {
                setModalDlocal([...modalDlocal, boxObject])
            }
        }

        else if (payment === "modalGocuotas"){
            if (isInObjectModal(boxObject) === true){
                modalGocuotas.map((box) => {
                    if (box.id === boxObject.id){
                        box.numberInstallment = boxObject.numberInstallment;
                        setModalGocuotas([...modalGocuotas]);
                    }
                  });

            } else {
                setModalGocuotas([...modalGocuotas, boxObject])
            }
        }
    }


    const handleRemoveBoxInObject = (payment, boxObjectId) =>{
        if (payment === "modalMercadopago"){
            setModalMercadopago([...modalMercadopago.filter((item) => item.id !== boxObjectId)])
        }

        else if (payment === "modalMobbex"){
            setModalMobbex([...modalMobbex.filter((item) => item.id !== boxObjectId)])
        }

        else if (payment === "modalModo"){
            setModalModo([...modalModo.filter((item) => item.id !== boxObjectId)])
        }

        else if (payment === "modalPagonube"){
            setModalPagonube([...modalPagonube.filter((item) => item.id !== boxObjectId)])
        }

        else if (payment === "modalDlocal"){
            setModalDlocal([...modalDlocal.filter((item) => item.id !== boxObjectId)])
        }

        else if (payment === "modalUala"){
            setModalUala([...modalUala.filter((item) => item.id !== boxObjectId)])
        }

        else if (payment === "modalGocuotas"){
            setModalGocuotas([...modalGocuotas.filter((item) => item.id !== boxObjectId)])
        }
    }


    // Prueba en consola
    const seeObject = () =>{
        console.log(totalSelection);
    }


    

    return (
        <OptionsContextObject.Provider value={{
            itemProducts,
            detailMain,
            cart,
            modalMercadopago,
            modalMobbex,
            modalPagonube,
            modalUala,
            modalModo,
            modalDlocal,
            modalGocuotas,
            setModalMercadopago,
            setModalMobbex,
            setModalPagonube,
            setModalModo,
            setModalDlocal,
            setModalGocuotas,
            setModalUala,
            handleAddLineInObject,
            handleRemoveLineInObject,
            isInObject,
            handleAddBoxInObject,
            handleRemoveBoxInObject,
            totalSelection,
            totalSelectionModal,
            totalSelectionArray,
            totalSelectionModalOptimized,
            seeObject
        }}>
          {children}
        </OptionsContextObject.Provider>
    )
}