import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// React Toastify
const Notification = (text, type)=>{
    const attributes = {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }
    if (type === 'success') {
        return toast.success(text,attributes)
    }else if (type === 'warning'){
        return toast.warning(text,attributes)
    }else if (type === 'error'){
        return toast.error(text,attributes)
    }
}    

export default Notification;