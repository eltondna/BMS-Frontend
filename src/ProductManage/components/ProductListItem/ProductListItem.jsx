import {
    useMutation,
    useQueryClient,
    useQuery
} from '@tanstack/react-query';
import FormatTime from '../../../utils/FormatTime';
import "./ProductListItem.scss"
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import Notification from '../../../components/Notification/Notification';
const ProductListItem = ({product, setOpenEdit, setEditProduct})=>{
    const queryClient = useQueryClient();

    const handleEdit = ()=>{
        setOpenEdit(true);
        setEditProduct(product);
    }
    // Delete Action
    const deleteProductAction = async ()=>{
        return await axios.post(BASE_URL + '/admin/product/delete', {id: product.id});
    }
    // Delete Mutation
    const mutation = useMutation({
    mutationFn:deleteProductAction,
    onSuccess: (data) => {
            console.log(data)
            Notification("Product deleted", "success")
            return queryClient.invalidateQueries({ queryKey: ['productAll'] })
        },
    })

    const handleDelete = ()=>{
        mutation.mutate();
    }
    return (
        <div className="productlistitem">
            
            <div className='field'>{product.name}</div>
        
            <div className='field'>{product.brief} </div>

            <div className='field'> {FormatTime.getTime(product.editTime)}</div>

            <div className='actions'>
                <EditNoteOutlinedIcon className='edit-icon' onClick={handleEdit} />
                <DeleteForeverOutlinedIcon className='delete-icon' onClick={handleDelete} />
            </div>        

        </div>
    )
}

export default ProductListItem;