
import AmazonasSolid from './scriptsByTheme/AmazonasSolid';
import AmazonasLight from './scriptsByTheme/AmazonasLight';
import Simple from './scriptsByTheme/Simple';
import Idea from './scriptsByTheme/Idea';
import Bahia from './scriptsByTheme/Bahia';
import Atlantico from './scriptsByTheme/Atlantico';
import Trend from './scriptsByTheme/Trend';
import Lifestyle from './scriptsByTheme/Lifestyle';
import Material from './scriptsByTheme/Material';
import Silent from './scriptsByTheme/Silent';
import Rio from './scriptsByTheme/Rio';


const ThemeTemplate = (props) => {

    const { theme, totalSelection } = props; 

    if (theme === "amazonas-solid"){
        return <AmazonasSolid totalSelection={totalSelection}/>
    }

    else if (theme === "amazonas-light"){
        return <AmazonasLight totalSelection={totalSelection}/>
    }

    else if(theme === "idea"){
        return <Idea totalSelection={totalSelection}/>
    }

    else if(theme === "simple"){
        return <Simple totalSelection={totalSelection}/>
    }

    else if(theme === "atlantico"){
        return <Atlantico totalSelection={totalSelection}/>
    }

    else if(theme === "silent"){
        return <Silent totalSelection={totalSelection}/>
    }

    else if(theme === "lifestyle"){
        return <Lifestyle totalSelection={totalSelection}/>
    }

    else if(theme === "trend"){
        return <Trend totalSelection={totalSelection}/>
    }

    else if(theme === "material"){
        return <Material totalSelection={totalSelection}/>
    }

    else if(theme === "rio"){
        return <Rio totalSelection={totalSelection}/>
    }

    else if(theme === "bahia"){
        return <Bahia totalSelection={totalSelection}/>
    }

}

export default ThemeTemplate;