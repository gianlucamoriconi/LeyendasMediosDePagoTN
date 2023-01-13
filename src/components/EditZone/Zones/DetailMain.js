
import Title from './Title';
import LinesForm from '../LinesForm';

const DetailMain = () => {

    return (
        <>
            <Title value="Detalle de producto (leyendas principales)"></Title>
            <div id="detailMain" className="container-lines-config">
                {/*zone debe coincidir con el nombre de zona en archivo optionsContextObject*/}
                <LinesForm zone="detailMain" />
            </div>
        </>
    )
}

export default DetailMain;