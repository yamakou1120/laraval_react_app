import { router } from '@inertiajs/react';
import { useState, useEffect,useRef} from 'react';
import DiaryCard from '../DiaryCard/DiaryCard'
import EditDiary from '../EditDiary/EditDiary'
import './Diary.css'
import Modal from 'react-modal';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';

function Diary(props){
    const {diary,user_id,errors,date} = props
    const [isOpen,setIsOpen] = useState(false)
    const [selectDiary, setSelectDiary] = useState({
        id:-1,
        user_id: user_id,
        title: '',
        date:new Date(date),
        text: '',
        image_path:''   
    })
    
    const openModal = (id, date, title, text, image_path) =>{
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
    
    console.log(diary)
    return(
        <div className='DiaryCard'>
            <div className='header'>
                <h1 className='Diary'>Diary</h1>
                <IconButton>
                    {diary[0]
                        ?<EditIcon  onClick={()=>openModal(diary[0].id, diary[0].date, diary[0].title, diary[0].text, diary[0].image_path)}/>
                        :<AddCircleOutlineIcon onClick={()=>openModal(-1,new Date(date), '', '', '')} />
                    }
                </IconButton>
            </div>
            {diary[0]
                ? <DiaryCard title={diary[0].title} date={diary[0].date} text={diary[0].text} image_path={diary[0].image_path}/> 
                : <DiaryCard title='' date={new Date(date)}  text='' image_path='' />
            }
           
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
                <EditDiary selectDiary={selectDiary} setSelectDiary={setSelectDiary} setIsOpen={setIsOpen} errors={errors} />
            </Modal>
        
        </div>  
    )
}
export default Diary