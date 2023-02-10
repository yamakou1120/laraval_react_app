import React from "react";
import { router } from '@inertiajs/react';
import { useState, useEffect,useRef} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Todo from './Components/Todo/Todo';
import Schedule from './Components/Schedule/Schedule';
import Money from './Components/Money/Money';
import Diary from './Components/Diary/Diary';
import './home.css';



export default function home(props) {
    const ref= useRef(false)
    const { todos,date,errors,schedules,diary } = props;
    console.log(props)
    
    const [today,setToday] = useState(new Date(date));
    
    const handleDateChange = (e)=>{
        setToday(e)
    }
    
     useEffect(()=>{
        const year = today.getFullYear()
        const month = today.getMonth()+1
        const date = today.getDate()
        if(ref.current) {
            router.get(`/home/${year}/${month}/${date}`)
        }else{
            ref.current = true
        }
        
    },[today])
    
    return (
        <div id='display'>
            
            <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >

            
        
                <div className='container'>
                    <div className='four-contents'>
                        <div className='left'>
                            <div className='box'>
                                <Todo todos={todos} user_id={props.auth.user.id} errors={errors} date={date}/>
                            </div>
                            
                            <div className='box'>
                                <Money />
                            </div>
                        </div>
                        
                        <div className='right'>
                            <div className='box'>
                                <Schedule user_id={props.auth.user.id} date={date} schedules={schedules} errors={errors} />
                            </div>
                            <div className='box diary'>
                                <Diary diary={diary} user_id={props.auth.user.id} errors={errors} date={date} />
                            </div>
                        </div>
                    </div>
                    <div className='side'>
                        
                        <Calendar value={today} onChange={handleDateChange} locale="en"/>
                    </div>
                        
                </div>
        </AuthenticatedLayout>
        
        </div>
        
    );
}