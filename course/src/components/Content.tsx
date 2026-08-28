import Part from "./Part";
import type { CoursePart } from "../types";


const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
    return (
        
            <Part courseParts={courseParts}/>
        
    )
}

export default Content;