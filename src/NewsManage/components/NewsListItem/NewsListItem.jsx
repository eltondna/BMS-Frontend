import { useState } from 'react';
import './NewsListItem.scss'
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import FormatTime from "../../../utils/FormatTime"
import axios from 'axios';
import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import { BASE_URL } from '../../../config';

const NewsListItem = ({news, setOpenEdit, setEditNews, setOpenPreview, setPreviewNews})=>{
    const queryClient = useQueryClient();
    
    const newsCategory = {
        1: '最新動態',
        2: '典型案例',
        3: '通知公告'
    }

    // Handle news publish State
    const updatePublishState = async (publishState) => {
        const payload = {id: news._id}
        payload.isPublish = news.isPublish === 1 ? 2 : 1;
        return await axios.post(BASE_URL + '/admin/news/publish',payload);
    }
    const publishStatemutation = useMutation({
        mutationFn: updatePublishState,
        onSuccess: (data) => {
        // Invalidate and refetch
        console.log(data.result);
        return queryClient.invalidateQueries({ queryKey: ['newsAll'] })
        },
    })
    const handlePublish = (e) => {
        e.preventDefault();
        publishStatemutation.mutate();
    }


    // Handle news delete
    const deleteNews = async ()=>{
        const payload = {id: news._id}
        return await axios.post(BASE_URL + '/admin/news/delete',payload);
    }
    const deleteMutation = useMutation({
        mutationFn: deleteNews,
        onSuccess: (data) => {
        // Invalidate and refetch
        console.log(data.result);
        return queryClient.invalidateQueries({ queryKey: ['newsAll'] })
        },
    })
    const handleDelete = (e)=>{
        e.preventDefault();
        deleteMutation.mutate();
    }

    // set opacity and pass in news info for display
    const handlePreview = () => {
        setOpenPreview(true);
        setPreviewNews(news);
    }
    const handleEdit = () => {
        setOpenEdit(true);
        setEditNews(news);
    }


    return (
        <div className="newslistItem">
            
            <div className='topic'>{news.title}</div>
        
            <div className='textfield'>{newsCategory[news.category]}</div>

            <div className='textfield'>{FormatTime.getTime(news.editTime)}</div>

            <div className='textfield'>
                {
                    news.isPublish === 1
                    ? <ToggleOnTwoToneIcon className='published-icon' onClick={(e)=> handlePublish(e)}/>
                    : <ToggleOffTwoToneIcon className='unpublished-icon' onClick={(e)=> handlePublish(e)} />
                }
            </div>
            <div className='actions'>
                <PreviewOutlinedIcon className='preview-icon' onClick={handlePreview} />
                <EditNoteOutlinedIcon className='edit-icon' onClick={handleEdit} />
                <DeleteForeverOutlinedIcon className='delete-icon' onClick={(e) => handleDelete(e)} />
            </div>

        </div>
    )
};
export default NewsListItem;