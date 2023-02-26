import React from 'react'
import {useState,useCallback,useEffect,useRef} from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import './calendar.css';
import Modal from 'react-modal';

import DatePicker,{ registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja';

import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

import CancelIcon from '@mui/icons-material/Cancel';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Checkbox from '@mui/material/Checkbox';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

export default function calendar(props) {
    
    const setDate = (dt) =>{
        const now = new Date();
        const year = dt.getFullYear();
        const month = dt.getMonth();
        const day = dt.getDate();
        const Hour = now.getHours()+1;
        const minute = 0;
        return new Date(year, month, day, Hour, 0)
        
    }
    
    const initialDate = setDate(new Date())
    
    const {events} = props
    console.log(events)
    registerLocale('ja', ja);
    const [isOpen,setIsOpen] = useState(false)
    const [deleteFlag,setDeleteFlag] = useState(false)
    const [selectEvent, setSelectEvent] = useState({
        id: -1,
        user_id: props.auth.user.id,
        title:'',
        memo:'',
        start: initialDate,
        end: initialDate,
        allDay:false
    })
    const [drag,setDrag] = useState(1)
    const ref = useRef(false)
    
    
    
    const openModal = () =>{
        setIsOpen(true);
    }
    
    const closeModal =() =>{
        setIsOpen(false) 
        setDeleteFlag(false)
        
    }
    
    const handleDateSelect = useCallback((selectInfo) => {
        let endDate = selectInfo.end.setDate(selectInfo.end.getDate()-1);
        endDate = new Date(endDate)
        const end = setDate(endDate)
        console.log(selectInfo)
        setSelectEvent({
            ...selectEvent,
            id:-1,
            start: setDate(selectInfo.start),
            end: end,
            allDay:false
        })
        setDeleteFlag(false)
        console.log(selectEvent)
    }, []);
    
    const handleEventClick = useCallback((clickInfo)=>{
        const endDate = clickInfo.event.end.setDate(clickInfo.event.end.getDate()-1);
        console.log(clickInfo)
        setIsOpen(true);
        if(clickInfo.event.allDay){
            setSelectEvent({
            ...selectEvent,
            id:clickInfo.event.id,
            title: clickInfo.event.title,
            start: clickInfo.event.start,
            end: endDate,
            memo:clickInfo.event.extendedProps.memo,
            allDay:clickInfo.event.allDay
        })
        }else{
            setSelectEvent({
            ...selectEvent,
            id:clickInfo.event.id,
            title: clickInfo.event.title,
            start: clickInfo.event.start,
            end: clickInfo.event.end,
            memo:clickInfo.event.extendedProps.memo,
            allDay:clickInfo.event.allDay
        })
        }
        
        setDeleteFlag(true)
    },[])
    
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
    
    const handleDropEvent = (info) =>{
        console.log(info)
       
            setSelectEvent({
            ...selectEvent,
            id:info.event.id,
            title: info.event.title,
            start: info.event.start,
            end: info.event.end,
            memo:info.event.extendedProps.memo,
            allDay:info.event.allDay
        })
        setDrag( drag*(-1))
    }
    
    //drag&dropされたときに更新。初回は動かさない。
    useEffect(() => {
     if(ref.current) {
      router.put(`/schedules/drop/${selectEvent.id}`,selectEvent)
     }else{
         ref.current = true
     }
    }, [drag])
    
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
    const handleDelete = ()=> {
        router.delete(`/schedules/delete/${selectEvent.id}`, 
        { onBefore: () => confirm("削除しますか？")}
        )
        closeModal();
    }
    
    
    return(
        <div id='display'>
             <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            >
                
                <main>
                    <div className='calendar'>
                    
                        <FullCalendar
                            plugins={[ dayGridPlugin,timeGridPlugin,interactionPlugin ]}
                            initialView="dayGridMonth"
                            locale="ja"
                            customButtons={{
                            myCustomButton: {
                                text: '＋',
                                click: function() {
                                    openModal()
                            },}
                            }}
                            headerToolbar={{
                                start: "prev,next today",
                                center: "title",
                                end: "dayGridMonth timeGridWeek timeGridDay myCustomButton",
                            }}
                            dayMaxEvents={true}
                            editable={true}
                            contentHeight='auto'
                            selectable={true}
                            select={handleDateSelect}
                            eventClick={handleEventClick}
                            events={events}
                            eventDrop={handleDropEvent}
                         />
                        
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
                                width                 : '650px',
                                height                : '60%',
                                transform             : 'translate(-50%, -50%)',
                                zIndex:2000,
                                overflow              : 'hidden'
                            }
                        }}
                        >
                            <div className='modal'>
                                <form onSubmit ={handlesubmit}>
                                    
                                    <div className='top'>
                                        <input placehplder='タイトル' type='text' value={selectEvent.title} onChange={(e) =>{setSelectEvent( {...selectEvent,title:e.target.value})} }/>
                                        <CancelIcon onClick={closeModal} />
                                    </div>
                                    
                                    <p className='text-red-600'>{props.errors.title}</p>
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
                                        
                                        <div className='calendar_icon'>
                                            <button type={'submit'}>
                                                <SendIcon />
                                            </button>
                                            {deleteFlag
                                                ?<button onClick={handleDelete}><DeleteIcon /></button>
                                                :<div></div>
                                            }
                                        </div>
                                    </div>
                                    </form>
                                </div>
                        </Modal>
                        
                    </div>
                </main>
            </AuthenticatedLayout>
        </div>
    )
}