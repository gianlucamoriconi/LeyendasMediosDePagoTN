const Footer = ({color}) => {

    if (color === "dark"){
        color = "text-light";
    }
    console.log(color);

    return (
        <>
        <footer className="w-100 p-2 text-center">
            <div>
                <p className={"brand-text " + color}>• Desarrollado y diseñado por <span className="brand-name">Gianluca Moriconi</span> •</p>
            </div>
        </footer>
        </>
    )
}

export default Footer;