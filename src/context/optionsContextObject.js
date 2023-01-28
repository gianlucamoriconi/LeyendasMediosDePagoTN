import { createContext, useState } from "react";


export const OptionsContextObject = createContext();

const initZonesInfo = JSON.parse(localStorage.getItem('zonesInfo')) || {
    itemProducts: [],
    detailMain: [],
    cart: []
};

const initPayments = JSON.parse(localStorage.getItem('payments')) || {
    modalMercadopago: [],
    modalMobbex: [],
    modalPagonube: [],
    modalModo: [],
    modalDlocal: [],
    modalGocuotas: [],
    modalUala: []
};


export const OptionsProvider = ({children}) => {

    //Zonas de edición
    const [zonesInfo, setZonesInfo] = useState(initZonesInfo);

    //Donde guardamos la información editada para los medios de pago en Modal 
    const [payments, setPayments] = useState(initPayments);

    //Dejamos solo los que tienen información
    const totalSelectionModalOptimized = () =>{
        var totalSelectionModalOptimizedObject = [];


        Object.entries(payments).forEach(entry => {
            const [payment, value] = entry;
            if (value.length > 0){
                totalSelectionModalOptimizedObject[payment] = value;
            }
        });  
        
        return Object.keys(totalSelectionModalOptimizedObject).length !== 0 ? totalSelectionModalOptimizedObject : [];
    }
    
    


    const totalSelection = {
        itemProducts: zonesInfo.itemProducts,
        detailMain: zonesInfo.detailMain,
        cart: zonesInfo.cart,
        detailModalNew: totalSelectionModalOptimized(),
        // detailModalOld: totalSelectionModal
    };


    /* Handlers que construyen los objetos de:
        itemProducts,
        detailMain,
        cart

        Los de detailModal son diferentes, están más abajo.
     */
    const handleAddLineInObject = (place, lineObject) =>{

        if (isInObject(place, lineObject) === true){
            zonesInfo[place].map((line) => {
                if (line.id === lineObject.id){
                  line.numberInput = lineObject.numberInput;
                  line.paymentMethodInput = lineObject.paymentMethodInput;
                  line.interest = lineObject.interest;
                  
                  return setZonesInfo({...zonesInfo});
                }
              });
        } else {
            zonesInfo[place].push(lineObject);
            setZonesInfo({...zonesInfo});
        }

        setZonesInfo({...zonesInfo});
    }

    const handleRemoveLineInObject = (zone, lineObjectId) =>{
        zonesInfo[zone] = zonesInfo[zone].filter((item) => item.id !== lineObjectId)
        setZonesInfo({...zonesInfo});
    }


    /* 
        Chequeo si existe esa misma linea (por su ID) para editarla o crearla:
        itemProducts,
        detailMain,
        cart

        Los de detailModal son diferentes, están más abajo.
     */
    const isInObject = (place, line) => {
        return zonesInfo[place].some((item) => item.id === line.id);
    }


    /*
        Chequeo si existe esa misma linea en detailModal (por su ID) para editarla o crearla.
     */
    const isInObjectModal = (place, box) => {
        return payments[place].some((item) => item.id === box.id);
    }


    /* Handlers que construye el objeto de detailModal:
        - handleAddBoxInObject
        - handleRemoveBoxInObject
    */

    const handleAddBoxInObject = (payment, boxObject) =>{

        if (isInObjectModal(payment, boxObject) === true){
            payments[payment].map((box) => {
                if (box.id === boxObject.id){
                    box.numberInstallment = boxObject.numberInstallment;
                    setPayments({...payments});
                }
              });

        } else {
            payments[payment].push(boxObject);
            setPayments({...payments});
        }
    }


    const handleRemoveBoxInObject = (payment, boxObjectId) =>{
        payments[payment] = payments[payment].filter((item) => item.id !== boxObjectId)
        setPayments({...payments});
    }


    // Prueba en consola
    const seeObject = () =>{
        console.log(totalSelection);
    }


    

    return (
        <OptionsContextObject.Provider value={{
            zonesInfo,
            payments,
            setPayments,
            handleAddLineInObject,
            handleRemoveLineInObject,
            isInObject,
            handleAddBoxInObject,
            handleRemoveBoxInObject,
            totalSelection,
            totalSelectionModalOptimized,
            seeObject
        }}>
          {children}
        </OptionsContextObject.Provider>
    )
}