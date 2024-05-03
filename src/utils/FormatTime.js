
import moment from "moment";
const FormatTime = {
    getTime: (date)=>{
        return moment(date).format("YYYY/MM/DD");
    }
}

export default FormatTime;