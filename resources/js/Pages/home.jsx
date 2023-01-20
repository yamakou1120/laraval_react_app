import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Todo from './Todo/Todo';
import Schedule from './Schedule/Schedule';
import Money from './Money/Money';
import Diary from './Diary/Diary';
import './home.css';



export default function home(props) {
    
    const { todos,date } = props; // 追加
    console.log(props);
    
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
                                <Todo />
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