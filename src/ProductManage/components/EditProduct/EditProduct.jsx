import './EditProduct.scss'
import CancelIcon from '@mui/icons-material/Cancel';
import { BASE_URL } from '../../../config';
import { useState } from 'react';
import axios from 'axios';
import Notification from '../../../components/Notification/Notification';
import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
const EditProduct =({setOpenEdit, product})=>{
    const [name, setName] = useState(product.name);
    const [brief, setBrief]=  useState(product.brief);
    const [description, setDescription] = useState(product.description);
    const [imageURL, setImageURL] = useState('');
    const [filePath, setFilePath] = useState('');
    const queryClient = useQueryClient()

    
    const editProductAction = async ()=>{
        const formData = new FormData()
        formData.append('id', product._id);
        formData.append('name', name);
        formData.append('brief', brief);
        formData.append('description', description);
        if (filePath !== "")
            formData.append('file', filePath);
        else
            formData.append('cover', product.cover);

        return await axios.post(BASE_URL + '/admin/product/update', formData, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        })
    }
    const mutation = useMutation({
        mutationFn: editProductAction,
        // We can returned the renewed data directly from backend
        // no need to pass the payload to the mutation function
        onSuccess: ({data}) => {
        // Invalidate and refetch
        Notification("編輯成功", "success")
        return queryClient.invalidateQueries({ queryKey: ['productAll'] })
        },
    })

    const handleClick = ()=>{
        if (name === ''){
            return Notification('Please Enter valid product name')
        }else if (brief === ''){
            return Notification('Please Enter valid product introduction')
        }else if (description === ''){
            return Notification('Please Enter valid product description')
        }
        mutation.mutate();
    }    

    const displayImage = (file)=>{
        const reader = new FileReader();
        setFilePath(file);
        reader.onload = (e)=>{
         setImageURL(e.target.result)
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className="editproduct">

              <div className="header">
                <div>編輯新闻</div>
                <CancelIcon className='icon' onClick={()=>{setOpenEdit(false)}}/>
              </div>
            
            <div className="textEditor">
                    <div className="field">
                        <label>產品名稱</label>
                        <input type="text" placeholder="Name ..." value={name} onChange={(e)=> setName(e.target.value)}/>
                    </div>

                    <div className="field">
                        <label>產品介紹</label>
                        <input type="text" placeholder="Brief ..." value={brief} onChange={(e)=> setBrief(e.target.value)}/>
                    </div>

                    <div className="xl-field"> 
                            <label htmlFor="content">產品描述</label>
                            <textarea className='content' 
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)} > 
                            </textarea>
                    </div>

                    <div className="pic-field">
                        <label htmlFor="profilePic">封面</label>
                        <div className='PicUpload'>
                            <input type='file' onChange={(e)=> displayImage(e.target.files[0])}/>
                            {
                            imageURL === "" 
                                ? <img src={BASE_URL +'/'+ product.cover} alt="" className="image"/>
                                : <img src={imageURL} alt="" className="image"/>
                            }
                        </div>
                    </div>

                    <div className="field">
                            <label htmlFor="profilePic"></label>
                            <button className='submit' onClick={handleClick}>編輯新闻</button>
                    </div>
                </div>
        </div>
    )
}

export default EditProduct;
