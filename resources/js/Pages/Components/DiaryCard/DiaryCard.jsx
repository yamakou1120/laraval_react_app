import React from "react"
import { useState, useEffect} from 'react';
import './DiaryCard.css';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';


function DiaryCard(props) {
    const {title, date, text, image_path} = props
    const a = new Date(date)     
    const year = String(a.getFullYear())
    const month = String(a.getMonth()+1)
    const dt = String(a.getDate())
    const dateStr=year + '.' + month + '.' + dt
        

    return (
        <div className='card'>
            <div className='left'>
                {image_path
                    ?<div className='diary_image'><img src={image_path} alt='画像が読み込めません'/></div>
                    :<ImageNotSupportedIcon />
                }
            </div>
            
            <div className='right'>
                <div className='display_title_date'>
                    <p className='title'>{title}</p>
                    <p>{dateStr}</p>
                </div>
                <p className='note'>{text}</p>
            </div>
        </div>
        
        
    );
}
export default DiaryCard 