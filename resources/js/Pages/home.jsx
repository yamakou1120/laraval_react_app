import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Todo from './Components/Todo/Todo';
import Schedule from './Components/Schedule/Schedule';
import Money from './Components/Money/Money';
import Diary from './Components/Diary/Diary';
import './home.css';



export default function home(props) {
    
    const { todos,date,errors } = props;

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
                                <Todo todos={todos} user_id={props.auth.user.id} errors={errors}/>
                            </div>
                            
                            <div className='box'>
                                <Money />
                            </div>
                        </div>
                        
                        <div className='right'>
                            <div className='box'>
                                <Schedule />
                            </div>
                            <div className='box'>
                                <Diary />
                            </div>
                        </div>
                    </div>
                    <div className='side'>{date}</div>
                        
                </div>
        </AuthenticatedLayout>
        
        </div>
        
    );
}