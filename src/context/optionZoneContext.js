import { createContext, useState } from "react";


export const OptionZoneContext = createContext();


const OptionZoneSaved = JSON.parse(localStorage.getItem('optionZone')) || {zone: "storefront", zoneTitle: "Para la tienda"};


export const OptionZoneProvider = ({children}) => {
    
    const [zone, setZone] = useState(OptionZoneSaved);

    const handleEditZoneSelected = (e) =>{
        console.log(e.target.id);
        const zoneSelected = e.target.id;
    
        if (zoneSelected === "storefront") {
            setZone({
                zone: "storefront",
                zoneTitle: "Para la tienda"
            });
        }
    
        else if (zoneSelected === "checkout") {
            setZone({
                zone: "checkout",
                zoneTitle: "Para el checkout"
            });
        }
    };
    

    return (
        <OptionZoneContext.Provider value={{
            zone,
            handleEditZoneSelected
        }}>
          {children}
        </OptionZoneContext.Provider>
    )

}