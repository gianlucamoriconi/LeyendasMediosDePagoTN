
import { Amazonas, Simple, Trend, Idea, Atlantico, Silent, Lifestyle, Material } from './scriptsByTheme/allThemes';


const ThemeTemplate = (props) => {

    // const themesDB = ["amazonas", "simple", "idea", "atlantico", "silent", "lifestyle", "material"];

    const { theme } = props; 

    if (theme === "amazonas"){
        return <Amazonas/>
    }

    else if(theme === "idea"){
        return <Idea/>
    }

    else if(theme === "simple"){
        return <Simple/>
    }

    else if(theme === "atlantico"){
        return <Atlantico/>
    }

    else if(theme === "silent"){
        return <Silent/>
    }

    else if(theme === "lifestyle"){
        return <Lifestyle/>
    }

    else if(theme === "trend"){
        return <Trend/>
    }

    else if(theme === "material"){
        return <Material/>
    }

}

export default ThemeTemplate;