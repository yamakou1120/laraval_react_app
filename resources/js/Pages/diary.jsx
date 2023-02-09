import React from "react";
import { router } from '@inertiajs/react';
import { useState, useEffect,useRef} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import './diary.css';
import DiaryCard from './Components/DiaryCard/DiaryCard';
import EditDiary from './Components/EditDiary/EditDiary';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Modal from 'react-modal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export default function diary(props) {
    
    const ref = useRef(false)
    const { errors, diaries,year,month } = props;
    const [selectYear,setSelectYear] = useState(year)
    const [selectMonth, setSelectMonth] = useState(month)
    const today_d = new Date().getDate()
    const [selectDiary, setSelectDiary] = useState({
        id:-1,
        user_id: props.auth.user.id,
        title: '',
        date:new Date(),
        text: '',
        image_path:''   
    })
    const [isOpen,setIsOpen] = useState(false)
    
    const handleYearChange = (e)=>{
        setSelectYear(e.target.value)
    }
    const handleMonthChange = (e)=>{
        setSelectMonth(e.target.value)
    }
    
    const openModal = (id, title, date, text, image_path) =>{
        setSelectDiary({
            ...selectDiary,
            id:id,
            date:date,
            title:title,
            text:text,
            image_path:image_path
        })
        setIsOpen(true)
    }
    const closeModal =() =>{
        setIsOpen(false)
    }
    
    let a=[]
    for(let i=2000;i<2050;i++){
        a.push(i)
    }
    let b = []
    for(let i=1;i<13;i++){
        b.push(i)
    }
    
    useEffect(()=>{
        if(ref.current) {
            router.get(`/diary/${selectYear}/${selectMonth}`)
        }else{
            ref.current = true
        }
        
    },[selectYear,selectMonth])
    
    return (
        <div id='display'>
            
            <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <header>
                <Select
                    value={selectYear}
                    onChange={handleYearChange}
                    autoWidth
                >
                    {a.map((value)=>(
                        <MenuItem key={value} value={String(value)}>{value}</MenuItem>
                    ))}
                    
                </Select>
                <h1>年</h1>
                
                <Select
                    value={selectMonth}
                    onChange={handleMonthChange}
                    autoWidth
                >
                    {b.map((value)=>(
                        <MenuItem key={value} value={String(value)}>{value}</MenuItem>
                    ))}
                </Select>
                <h1>月</h1>
                <button onClick={()=>openModal(-1,'',new Date(selectYear,selectMonth-1,today_d),'','')}><AddCircleOutlineIcon /></button>
            </header>
            <div className='diaries'>
                {diaries.map((value)=>(
                    <div key={value.id} className='diary_box'onClick={()=>openModal(value.id, value.title, value.date, value.text, value.image_path)}>
                        <DiaryCard title={value.title} date={value.date} text={value.text} image_path={value.image_path}/>
                    </div>
                ))}
            </div>
            
            <Modal
                // isOpenがtrueならモーダルが起動する
                isOpen={isOpen}
                // モーダルを閉じる処理を定義
                onRequestClose={closeModal}
                // スタイリングを定義
                style={{
                    overlay: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        backgroundColor: "rgba(0,0,0,0.3)",
                        zIndex:1000
                    },
                
                    content : {
                        top                   : '50%',
                        left                  : '50%',
                        right                 : 'auto',
                        bottom                : 'auto',
                        marginRight           : '-50%',
                        width                 : '65%',
                        height                : '65%',
                        transform             : 'translate(-50%, -50%)',
                        zIndex:2000
                    }
                }}
            >
                <EditDiary selectDiary={selectDiary} setSelectDiary={setSelectDiary} setIsOpen={setIsOpen} errors={errors} setSelectYear={setSelectYear} setSelectMonth={setSelectMonth}/>
    
            </Modal>
        
        </AuthenticatedLayout>
        
        </div>
        
    );
}