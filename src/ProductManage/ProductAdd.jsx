import "./ProductAdd.scss"
import axios from "axios";
import { useState } from "react";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { BASE_URL } from "../config";
import {
    useMutation,
} from '@tanstack/react-query'
import Notification from "../components/Notification/Notification";
import { useTranslation } from "react-i18next";

const ProductAdd = ()=>{
    const [name, setName] = useState("");
    const [brief, setBrief] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [filePath, setFilePath] = useState("");
    const {t} = useTranslation();


    function displayImage(file) {
        if (!file){
            console.log("Action Cancelled")
            return;
        }
        const reader = new FileReader();
        setFilePath(file)
        reader.onload = function (e) {
          setImageURL(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    // Upload Action
    const addProductAction = async()=>{
        const formData = new FormData()
        formData.append("name", name);
        formData.append("brief", brief);
        formData.append("description", description);

        if (filePath !== '') formData.append("file", filePath)
        return await axios.post(BASE_URL + "/admin/product/add",formData,{
            // Needed whenever a form data is sent
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
    }
     // Upload Mutation
     const mutation = useMutation({
        mutationFn: addProductAction,
        onSuccess: (data) => {
            console.log(data)
            Notification("Product Added Successfully", "success")
            setName("")
            setBrief("")
            setDescription("")
            setImageURL("")
            setFilePath("")
        },
    })

    const handleClick = ()=>{
        if (name === '') {
           return Notification("Product Name is required", "warning")
        }else if (brief === ''){
            return Notification("Product Title is required", "warning")
        }else if (description === ''){
            return Notification("Product Description is required", "warning")
        }else if (imageURL === ''){
            return Notification("Product Image is required", "warning")
        }else{
            return mutation.mutate();
        }
    }



    return (
        <div className="productadd">
        <div className='container'>

            <div className="top">
                <div className="first">
                    {t('product_manage')}
                </div>
                <div style={{color: '#DDD'}}> | </div>
                <div className="last">{t('add_product')}</div>
            </div>

            <div className="main">
                <div className="infoFiller">
                    
                    <div className="field">
                        <label htmlFor="prorrt65">{t('product_name')}</label>
                        <input type="text" name="product_name" 
                            placeholder="Product Name . . . "
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="title">{t('product_brief')}</label>
                        <input type="text" name="title" 
                        placeholder="Product Brief . . . "
                        onChange={(e) => setBrief(e.target.value)}
                        value={brief} />
                    </div>

                    <div className="field">
                        <label htmlFor="description">{t('product_desc')}</label>
                        <textarea type="text" name="description" 
                            placeholder="Description. . . "
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            > 
                        </textarea>
                    </div>

                    <div className="field">
                        <label htmlFor="profilePic">{t('product_cover')}</label>
                        <div className='PicUpload'>
                            {
                                imageURL === '' 
                                ?<AddPhotoAlternateOutlinedIcon className='icon' /> 
                                :<img src={imageURL} alt="" className='image'/>
                            }
                            <input type='file' 
                            onChange={(e)=> displayImage(e.target.files[0])}
                            />
                        </div>
                    </div>

                    <div className="field ">
                        <label htmlFor="profilePic"></label>
                        <button className='submit' onClick={handleClick}> {t('add_product')} </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
    )
};
export default ProductAdd;