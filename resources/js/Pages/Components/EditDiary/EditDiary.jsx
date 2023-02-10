import React from "react";
import { router } from '@inertiajs/react';
import { useState, useEffect,useRef} from 'react';
import './EditDiary.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';


function EditDiary(props) {
    
    const {selectDiary, setSelectDiary,setIsOpen,errors,setSelectYear,setSelectMonth} = props;
    const inputRef = useRef('')
    const a = new Date(selectDiary.date)     
    const [year,setYear] = useState(String(a.getFullYear()))
    const [month,setMonth] = useState(String(a.getMonth()+1))
    const [dt,setDt] = useState(String(a.getDate()))
    
    const imgButtonClick = () =>{
        inputRef.current.click();
    }
    
    const handleSubmit = (e) =>{
        console.log(selectDiary)
        e.preventDefault();
        
        if(selectDiary.id === -1){
            router.post('/diaries/create',selectDiary,{
          forceFormData: true,
        })
        }
        else{
            router.post(`/diaries/edit/${selectDiary.id}`,selectDiary,{
                forceFormData: true,
                }
        )
        }
        setSelectYear(year)
        setSelectMonth(month)
    }
    
    const handleDelete = (id)=> {
        router.delete(`/diaries/delete/${id}`, 
            { onBefore: () => confirm("削除しますか？")}
        )
        setIsOpen(false)
    }
    
    useEffect(()=>{
        setSelectDiary({
            ...selectDiary,
            date: new Date(year,month-1,dt)
        })
    },[year,month,dt])
    
    
    let b=[]
    for(let i=2000;i<2050;i++){
        b.push(i)
    }
    let c = []
    for(let i=1;i<13;i++){
        c.push(i)
    }
    let d=[]
    for(let i=1;i<32;i++){
        d.push(i)
    } 
    
    return (
        <form  onSubmit={handleSubmit} >
            <div className='card'>
                <div className='left'>
                    
                    <input hidden ref={inputRef} type="file" name='image_path'
                    onChange={(e)=>setSelectDiary({
                        ...selectDiary,
                        image_path:e.target.files[0]
                    })}/>
                    <button className='bg-blue-500 text-white rounded-md ml-4 px-4 py-2' onClick={imgButtonClick}>画像を選択</button>
                    {selectDiary.image_path instanceof Object
                        ?<div className='diary_image'><img src={window.URL.createObjectURL(selectDiary.image_path)} alt='画像が読み込めません'/></div>
                        : selectDiary.image_path
                            ?<div className='diary_image'><img src={selectDiary.image_path} /></div>
                            :<ImageNotSupportedIcon />
                    }
                    
                </div>
                
                <div className='right'>
                    <div className='title_date'>
                        <input className ='title' type='text' value={selectDiary.title}
                        onChange={(e)=>setSelectDiary({
                            ...selectDiary,
                            title:e.target.value
                        })} />
                        <p className="text-red-600">{errors.title}</p>
                        <div className='diary_date'>
                            <Select
                            value={year}
                            onChange={(e)=>setYear(e.target.value)}
                            autowidth
                            >
                                {b.map((value)=>(
                                    <MenuItem key={value} value={String(value)}>{value}</MenuItem>
                                ))}
                            </Select>
                            <p>.</p>
                           <Select
                            value={month}
                            onChange={(e)=>setMonth(e.target.value)}
                            autowidth
                            >
                                {c.map((value)=>(
                                    <MenuItem key={value} value={String(value)}>{value}</MenuItem>
                                ))}
                            </Select>
                            <p>.</p>
                            <Select
                            value={dt}
                            onChange={(e)=>setDt(e.target.value)}
                            autowidth
                            >
                                {d.map((value)=>(
                                    <MenuItem key={value} value={String(value)}>{value}</MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                    
                    <textarea className='note edit' value={selectDiary.text} onChange={(e)=>{
                        setSelectDiary({
                            ...selectDiary,
                            text:e.target.value
                        })
                    }} ></textarea>
                </div>
                <div className='diary_icon'>
                    <div className='send'><button  type='submit'><SendIcon /></button></div>
                    <button type='button'><DeleteIcon onClick={()=>handleDelete(selectDiary.id)} /></button>
                </div>
                
            </div>
        </form>
        
        
        
    );
}
export default EditDiary 