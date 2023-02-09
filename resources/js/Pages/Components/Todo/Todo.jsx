import React from 'react';
import { useState, useEffect, useRef} from 'react';
import { router } from '@inertiajs/react';
import './Todo.css';
import Modal from 'react-modal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import Checkbox from '@mui/material/Checkbox';
import SendIcon from '@mui/icons-material/Send';

function Todo(props){

    const ref = useRef(false)
    const [check,setCheck] = useState(1)
    const {todos,user_id ,errors} = props
    const [isOpen,setIsOpen] = useState(false)
    const [selectTodo, setSelectTodo] = useState({
        id:'',
        user_id: user_id,
        title: '',
        memo: '',
        status:''
    })
    
    console.log(selectTodo)
    
    const openModal =(id, title,memo,status)=>{
        setSelectTodo({
            ...selectTodo,
            id:id,
            title:title,
            memo:memo,
            status:status
        });
        setIsOpen(true);
    };
    
    const closeModal = ()=>{
        setIsOpen(false)
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(selectTodo.id === -1){
            router.post('/todos/create',selectTodo)
        }
        else{
            router.put(`/todos/edit/${selectTodo.id}`,selectTodo)
        }
        if(errors){
            return;
        }
        
    }
    
    const handleDelete = (id)=> {
        router.delete(`/todos/delete/${id}`, 
        { onBefore: () => confirm("削除しますか？")}
        )
    }
        
    
    const handleChecked = (id,title,memo,status) =>{
        setSelectTodo({
            ...selectTodo,
            id:id,
            title:title,
            memo:memo,
            status: !status
        })
        todos.map((todo)=>{
            if (todo.id === id){
                todo.status = !todo.status
            }
        })
        setCheck( check * (-1) )
    }
    
    //checkされたときに更新。初回は動かさない。
    useEffect(() => {
     if(ref.current) {
      router.put(`/todos/edit/${selectTodo.id}`,selectTodo)
     }else{
         ref.current = true
     }
    }, [check])
    
    return(
        <div id ="todo">
            <div className='header'>
                <h1 className='Todo'>Todo</h1>
                <IconButton>
                    <AddCircleOutlineIcon  onClick={()=>openModal(-1,'','',false)}/>
                </IconButton>
            </div>
            <div className='content'>
                {todos.map((todo)=>(
                    <div className='row' key={todo.id}>
                        <div className='check_title'>
                            <Checkbox color='default' checked={todo.status} onChange={(e)=>handleChecked(todo.id,todo.title,todo.memo,todo.status)}></Checkbox>
                            {todo.status
                                ?<span className='del'><h1 className='title'>{todo.title}</h1></span>
                                :<h1 className='title'>{todo.title}</h1>
                            }

                        </div> 
                        <div className='icon'>
                            <IconButton>
                                <EditIcon onClick={()=>openModal(todo.id,todo.title,todo.memo,todo.status)}/>
                            </IconButton>
                            <IconButton>
                                <DeleteIcon onClick={()=>handleDelete(todo.id)}/>
                            </IconButton> 
                        </div>
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
                        width                 : '30%',
                        height                : '40%',
                        transform             : 'translate(-50%, -50%)',
                        zIndex:2000
                    }
                }}
            >
                
                <form id={selectTodo.id} onSubmit={handleSubmit}>
                    <div className='button'>
                        <IconButton> <CancelIcon onClick={closeModal} /></IconButton>
                    </div>
                    <div className='modal_title'>
                         <input  type="text" placeholder='タイトル' value={selectTodo.title}  onChange={(e)=>setSelectTodo({...selectTodo, title:e.target.value})}/>
                    </div>
                    <p className="text-red-600">{errors.title}</p>
                    <div className='modal_memo'>
                        <textarea  placeholder='詳細' value={selectTodo.memo} onChange={(e)=>setSelectTodo({...selectTodo, memo:e.target.value})}/>
                    </div>
                     <p className="text-red-600">{errors.memo}</p>
                    
                   <div className='button'>
                        <button type='submit'> <SendIcon /> </button>
                    </div>
                    
                </form>
                
            </Modal> 
        </div>   
        
    )
    
}
export default Todo