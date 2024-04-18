import { useLocation } from "react-router-dom"

const NotMatch =  ()=>{
    const location = useLocation();
    return (
        <div className="nomatch">
            Route not found "{location.pathname}"
        </div>
    )
}
export default NotMatch