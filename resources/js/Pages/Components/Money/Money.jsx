import React from 'react';
import { useState, useEffect, useRef} from 'react';
import { router } from '@inertiajs/react';
import './Money.css';
import DatePicker,{ registerLocale } from "react-datepicker";
import ja from 'date-fns/locale/ja';
import Modal from 'react-modal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import Switch from '@mui/material/Switch';


function Money(props){
    registerLocale('ja', ja);
    const {date,money,errors} = props;
    const [isOpen,setIsOpen] = useState(false);
    
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
    
    const [selectMoney,setSelectMoney] = useState({
        id:-1,
        user_id:props.user_id,
        title:'',
        memo:'',
        date:new Date(),
        price:0,
        status:false
    })
    
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
    
    return(
        <div id="money">
            <div className='header'>
                <h1 className='Money'>Money</h1>
                <IconButton>
                    <AddCircleOutlineIcon  onClick={()=>openModal(-1,'','',new Date(date),0,false)}/>
                </IconButton>
            </div>
            
            <div className='content'>
                {money.map((value)=>(
                    <div className='row' key={value.id}>
                        {value.status
                            ?<div className='titleDate'>
                                <div>
                                    {value.title} &ensp;
                                    +{value.price}</div>
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
                ))}
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
        </div>    
    )
}
export default Money