
import { AmazonasSolid, AmazonasLight, Simple, Trend, Idea, Atlantico, Silent, Lifestyle, Material, Rio } from './scriptsByTheme/allThemes';


const ThemeTemplate = (props) => {

    const { theme } = props; 

    if (theme === "amazonas-solid"){
        return <AmazonasSolid/>
    }

    else if (theme === "amazonas-light"){
        return <AmazonasLight/>
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

    else if(theme === "rio"){
        return <Rio/>
    }

}

export default ThemeTemplate;