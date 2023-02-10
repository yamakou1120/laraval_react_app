import { useState, useEffect, useRef} from 'react';
import { router } from '@inertiajs/react';
import './Schedule.css';
import Modal from 'react-modal';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DatePicker,{ registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja';


function Schedule(props){
    registerLocale('ja', ja);
    const {date,schedules,errors} = props
    const setDate = (dt) =>{
        const now = new Date();
        const year = dt.getFullYear();
        const month = dt.getMonth();
        const day = dt.getDate();
        const Hour = now.getHours()+1;
        const minute = 0;
        return new Date(year, month, day, Hour, 0)
    }
    const initialDate = setDate(new Date(date))
    
    const [isOpen,setIsOpen] =useState(false)
    const [selectEvent, setSelectEvent] = useState({
        id: -1,
        user_id: props.user_id,
        title:'',
        memo:'',
        start: initialDate,
        end: initialDate,
        allDay:false
    })
    
    const openModal = (id,title,memo,start,end,allDay) =>{
        if(allDay){
            setSelectEvent({
            ...selectEvent,
            id:id,
            title:title,
            memo:memo,
            start:start,
            end:end.setDate(end.getDate()-1),
            allDay:allDay
        })
        }
        else{
           setSelectEvent({
            ...selectEvent,
            id:id,
            title:title,
            memo:memo,
            start:start,
            end:end,
            allDay:allDay
        }) 
        }
        setIsOpen(true);
        console.log(selectEvent.end)
        
    }
    const closeModal = ()=>{
        setIsOpen(false)
    }
    
    const changeStartDate =(date) =>{
        setSelectEvent({
            ...selectEvent,
            start:date
        })
    }
    const changeEndDate =(date) =>{
        
        setSelectEvent({
            ...selectEvent,
            end: date
        })
        
    }
    
     const handlesubmit = (e)=>{
        e.preventDefault();
    
        if(selectEvent.id === -1){
            router.post('/schedules/create', selectEvent)
        }
        else{
            router.put(`/schedules/edit/${selectEvent.id}`, selectEvent)
        }
        
        closeModal();
        
    }
    
     const handleDelete = (id)=> {
        router.delete(`/schedules/delete/${id}`, 
        { onBefore: () => confirm("削除しますか？")}
        )
    }
    
    
    return(
        <div id='schedule_component'>
             <div className='header'>
                <h1 className='Schedule'>Schedule</h1>
                <IconButton>
                    <AddCircleOutlineIcon  onClick={()=>openModal(-1,'','',initialDate,initialDate,false)}/>
                </IconButton>
            </div>
            <div className='content'>
                {schedules.map((schedule)=>(
                    <div className='row' key={schedule.id}>
                        {schedule.allDay
                            ?<div className='titleDate'>
                                <div>
                                    終日&ensp;
                                {schedule.title}</div>
                            </div>
                            :<div className='titleDate'>
                                {("0"+new Date(schedule.start).getHours()).slice(-2)}:{("0"+new Date(schedule.start).getMinutes()).slice(-2)}
                                -
                                {("0"+new Date(schedule.end).getHours()).slice(-2)}:{("0"+new Date(schedule.end).getMinutes()).slice(-2)}
                                &ensp;
                                {schedule.title}
                            </div>
                        }
                        
                        
                        <div className='icon'>
                            <IconButton>
                                <EditIcon onClick={()=>openModal(schedule.id,schedule.title,schedule.memo,new Date(schedule.start),new Date(schedule.end),schedule.allDay)}/>
                            </IconButton>
                            <IconButton>
                                <DeleteIcon onClick={()=>handleDelete(schedule.id)}/>
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
                                <form onSubmit ={handlesubmit}>
                                    
                                    <div className='top'>
                                        <input placehplder='タイトル' type='text' value={selectEvent.title} onChange={(e) =>{setSelectEvent( {...selectEvent,title:e.target.value})} }/>
                                        <CancelIcon onClick={closeModal} />
                                    </div>
                                    
                                    <p className='text-red-600'>{errors.title}</p>
                                    <div className='date'>
                                        <div className='start'>
                                             {selectEvent.allDay
                                                ?<DatePicker
                                                locale="ja"
                                                dateFormat="MM月d日(eee)"
                                                selected={selectEvent.start}
                                                todayButton="today"
                                                name="inputStart"
                                                onChange={changeStartDate}
                                                />
                                                :<DatePicker
                                                locale="ja"
                                                dateFormat="MM月d日(eee) HH:mm"
                                                selected={selectEvent.start}
                                                todayButton="today"
                                                name="inputStart"
                                                showTimeSelect
                                                timeIntervals={15}
                                                onChange={changeStartDate}
                                                />
                                            }
                                        </div>
                                        <div calssName='rightIcon'>
                                            <ChevronRightIcon />
                                        </div>
                                        <div className='end'>
                                            {selectEvent.allDay
                                                ?<DatePicker
                                                locale="ja"
                                                dateFormat="MM月d日(eee)"
                                                selected={selectEvent.end}
                                                todayButton="today"
                                                name="inputEnd"
                                                onChange={changeEndDate}
                                                />
                                                :<DatePicker
                                                locale="ja"
                                                dateFormat="MM月d日(eee) HH:mm"
                                                selected={selectEvent.end}
                                                todayButton="today"
                                                name="inputEnd"
                                                showTimeSelect
                                                timeIntervals={15}
                                                onChange={changeEndDate}
                                                />
                                            }
                                        </div>
                                        <div>
                                            <p>終日</p>
                                            <Checkbox checked={selectEvent.allDay}onChange={(e)=>setSelectEvent({
                                                ...selectEvent,
                                                allDay: !selectEvent.allDay
                                            })}/>
                                        </div>
                                    </div>
                                    
                                    <div className='bottom'>
                                        <textarea value={selectEvent.memo} onChange={(e)=>setSelectEvent({
                                                            ...selectEvent,
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
export default Schedule