import {useState,useEffect} from 'react';
import classes from './Feed.module.scss';
import NewBook from './NewBook/NewBook';
import Book from './Book/Book';
import { useNavigate, Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
import { useConfigContext } from '../../contexts/ConfigContexts';
import { useUserContext } from '../../contexts/UserContext';

const Feed = () =>{
    const [books,setBooks]=useState([]);
    const navigate = useNavigate(); 
    const { startLoading, stopLoading } = useConfigContext();
    const { token, user } = useUserContext()

        
    useEffect(()=>{
        FetchBook();
    },[]);

    const FetchBook=async()=>{
        try {
            startLoading();
            const {data} =await axios.get("/post");
            setBooks(data.posts);          
        } catch (error) {
            toast.error("Unexpected error!");
        }finally{
            stopLoading();
        }
    }

    const saveBook=async(image,title,precio)=>{
        try {
            startLoading();
            await axios.post("/post",{image,title,precio},{headers:{authorization: `Bearer ${token}` }});
            toast.success("Libro vendido exitosamente");
            
        } catch (error) {
            const {status}=error.response || {status:500};
            const msg={
                "400": "Wrong Fields",
                "404": "Not Found",
                "500": "Something went wrong!"
            }
           toast.error(msg[status.toString()]  || "Unexpected error!") ;
        }finally{
            stopLoading();
        }
    }

    const onAddBookHandler=async(image,title,precio) => {
        await saveBook(image,title,precio);
        FetchBook();
};


        return (  
        <div className={classes["feed-wrapper"]}>
        <NewBook onAddBooks={onAddBookHandler}/>

        </div>

        );
    }
    export default Feed;


    /*
    import {useState,useEffect} from 'react';
import classes from './Feed2.module.scss';
import NewBook from './NewBook/NewBook';
import Book from './Book/Book';
import { ToastContainer, toast } from 'react-toastify';


const Feed2 = () =>{
    const [books,setBooks]=useState([]);
    toast('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    useEffect(()=>{
        FetchBook();
    },[]);

    const FetchBook=async()=>{
        try {
            const response = await fetch("http://localhost:3500/api/post/");
            if(response.ok){
                const data = await response.json();
                setBooks(data.books);
            }
        } catch (error) {
            toast.error("Unexpected error!");
        }
    }
    const onAddBookHandler=(image,title,precio) => {
        const _books=[...books,{
            _id: new Date().getTime().toString(),
            image: image,
            title: title,
            precio: precio
        }];
	setBooks(_books);
};



        return (
            <div className={classes["feed-wrapper"]}>
            <NewBook onAddBooks={onAddBookHandler}/>
            <Book books={books}/>

            </div>
        );
    }
    export default Feed2;
    */