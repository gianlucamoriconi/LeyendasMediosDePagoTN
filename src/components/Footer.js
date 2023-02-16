const Footer = ({color}) => {

    if (color === "dark"){
        color = "text-light";
    }

    return (
        <>
        <footer className="w-100 p-2 text-center background-light">
            <div>
                <p className={"brand-text mb-0 " + color}>• Diseñado y desarrollado por <span className="brand-name">Gianluca Moriconi</span> •</p>
            </div>
        </footer>
        </>
    )
}

export default Footer;