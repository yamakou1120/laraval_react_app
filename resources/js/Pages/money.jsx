import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect, useRef} from 'react';
import { router } from '@inertiajs/react';
import './money.css';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import dayjs from 'dayjs';

import DatePicker,{ registerLocale } from "react-datepicker";
import ja from 'date-fns/locale/ja';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Modal from 'react-modal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import Switch from '@mui/material/Switch';

function money(props){
    const ref = useRef(false)
    registerLocale('ja', ja);
    const { errors, money,dayPlus,dayMinus,monthPlus,monthMinus,year,month } = props;
    const [isOpen,setIsOpen] = useState(false)
    const check =()=> {
        const a = new Date()
        if((month-1)==a.getMonth() && year==a.getFullYear()){
            return a
        }
        return new Date(year,month-1)
    }
    const [today,setToday] = useState(check)
    const [selectYear,setSelectYear] = useState(year)
    const [selectMonth, setSelectMonth] = useState(month)
    const handleYearChange = (e)=>{
        setSelectYear(e.target.value)
    }
    const handleMonthChange = (e)=>{
        setSelectMonth(e.target.value)
    }
    console.log(props);
    
    let showDayPlus = {}
    dayPlus.map((value)=>(
        showDayPlus[value.date] =value.day_plus
    ))
    let showDayMinus = {}
    dayMinus.map((value)=>(
        showDayMinus[value.date] =value.day_minus
    ))
    
    const handleDateChange = (e)=>{
        setToday(e)
        console.log(today)
    }
    
    const show = ({date, view})=>{
        if (view === 'month') {
              const targetDate = dayjs(date).format('YYYY-MM-DD')
                
             return  showDayPlus[targetDate] && showDayMinus[targetDate]
                ?<div className="tile">
                        <p className="dayPlus">+{showDayPlus[targetDate]}</p>
                        <p className="dayMinus">-{showDayMinus[targetDate]}</p>
                 </div>
                : showDayPlus[targetDate]
                    ? <div className="tile">
                        <p>+{showDayPlus[targetDate]}</p>
                    </div>
                    : showDayMinus[targetDate]
                        ?<div className="tile">
                            <p>-{showDayMinus[targetDate]}</p>
                        </div>
                        :null
                

          }
    }
    
    const [selectMoney,setSelectMoney] = useState({
        id:-1,
        user_id:props.auth.user.id,
        title:'',
        memo:'',
        date:new Date(),
        price:0,
        status:false
    })
    
    
    const openModal = (id,title,memo,date,price,status) =>{
        setSelectMoney({
            ...selectMoney,
            id:id,
            title:title,
            memo:memo,
            date:date,
            price:price,
            status:status
        })
        setIsOpen(true)
    }
    const closeModal = () =>{
        setIsOpen(false)
    }
    
    const changeMoneyDate =(date) =>{
        setSelectMoney({
            ...selectMoney,
            date:date
        })
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(selectMoney.id === -1){
            router.post('/money/create', selectMoney)
        }
        else{
            router.put(`/money/edit/${selectMoney.id}`, selectMoney)
        }
        closeModal();
    }
    
    const handleDelete = (id) =>{
        router.delete(`/money/delete/${id}`, 
        { onBefore: () => confirm("削除しますか？")}
        )
    } 
    
    const handleSwitchChange = (e) =>{
        setSelectMoney(
            {...selectMoney,
                status:e.target.checked
            }
        )
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
            router.get(`/money/${selectYear}/${selectMonth}`)
        }else{
            ref.current = true
        }
        
    },[selectYear,selectMonth])
    
    return(
        
        <div id='display'>
            
            <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            >
                
                <div className="money_content">
                    <div className="calendar"><Calendar value={today} onChange={handleDateChange} locale="en" tileContent={show} onViewChange={({ action, activeStartDate, value, view }) => alert('New view is: ', view)}/></div>
                    <div className="left">
                        <div className="report">
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
                            </header>
                            <h1>収入：{monthPlus[0].month_plus}</h1>
                            <h1>支出：{monthMinus[0].month_minus}</h1>
                            <h1>収支：{monthPlus[0].month_plus - monthMinus[0].month_minus}</h1>
                        </div>
                        <IconButton>
                            <AddCircleOutlineIcon  onClick={()=>openModal(-1,'','',new Date(),0,false)}/>
                        </IconButton>
                        <div className='content'>
                                {money.map((value)=>(
                                    today.getFullYear() === new Date(value.date).getFullYear() && today.getMonth() === new Date(value.date).getMonth() && today.getDate() === new Date(value.date).getDate()
                                    ?<div className='row' key={value.id}>
                                        {value.status
                                            ?<div className='titleDate'>
                                                <div>
                                                    {value.title} &ensp;
                                                    +{value.price}
                                                </div>
                                            </div>
                                            :<div className='titleDate'>
                                                {value.title} &ensp;
                                                -{value.price}
                                            </div>
                                        }
                                        
                                        
                                        <div className='icon'>
                                            <IconButton>
                                                <EditIcon onClick={()=>openModal(value.id,value.title,value.memo,new Date(value.date),value.price,value.status)}/>
                                            </IconButton>
                                            <IconButton>
                                                <DeleteIcon onClick={()=>handleDelete(value.id)}/>
                                            </IconButton> 
                                        </div>
                                    </div>
                                    
                                    :null
                                ))}
                                
                            
                        </div>
                    </div>
                </div>
                
                
                <Modal
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
                            width                 : '650px',
                            height                : '60%',
                            transform             : 'translate(-50%, -50%)',
                            zIndex:2000
                        }
                    }}>
            
                <div className='modal'>
                    <form onSubmit ={handleSubmit}>
                        
                        <div className='top'>
                            <input placehplder='タイトル' type='text' value={selectMoney.title} onChange={(e) =>{setSelectMoney( {...selectMoney,title:e.target.value})} }/>
                            <CancelIcon onClick={closeModal} />
                        </div>
                        <p className='text-red-600'>{errors.title}</p>
                        <input placehplder='金額' type='text' value={selectMoney.price} onChange={(e) =>{setSelectMoney( {...selectMoney,price:e.target.value})} }/>
                        <div className="switch">
                            <p>支出 &ensp; 収入</p>
                            <Switch checked={selectMoney.status} onChange={handleSwitchChange} />
                        </div>
                        <div className='date'>
                            <div className='money_date'>
                                <DatePicker
                                locale="ja"
                                dateFormat="MM月d日(eee)"
                                selected={selectMoney.date}
                                todayButton="today"
                                name="inputStart"
                                onChange={changeMoneyDate}
                                />
                                
                            </div>
                           
                        </div>
                        
                        <div className='bottom'>
                            <textarea value={selectMoney.memo} onChange={(e)=>setSelectMoney({
                                                ...selectMoney,
                                                memo:e.target.value
                                                })} />
                            <div>
                                <button type={'submit'}>
                                    <SendIcon />
                                </button>
                            </div>
                        </div>
                        </form>
                    </div>
            
            </Modal>
            </AuthenticatedLayout>
        
        </div>
    )
}
export default money