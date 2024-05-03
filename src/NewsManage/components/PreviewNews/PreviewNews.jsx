import './PreviewNews.scss'
import parse from 'html-react-parser';
import moment from 'moment'
import StarsIcon from '@mui/icons-material/Stars';
import CancelIcon from '@mui/icons-material/Cancel';
const PreviewNews = ({news, setOpenPreview})=>{    const newsElement = parse(news.content);
    return (
        <div className="previewnews">
            <div className="header">
                <div>預覽新闻</div>
                <CancelIcon className='icon' onClick={()=>{setOpenPreview(false)}}/>
            </div>
            <div className="title">
                <div className='newstitle'>
                {news.title}
                </div>
                <div className='date'>{moment(news.editTime).format('YYYY/MM/DD')}</div>
            </div>
            <div className='divider'>
                <div className='line'></div>
                <StarsIcon className='icon' />
                <div className='line'></div>
            </div>
            <div className="content">
                {newsElement}
            </div>
    </div>
    )
}

export default PreviewNews;