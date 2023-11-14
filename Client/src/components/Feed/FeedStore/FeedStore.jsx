import {useState,useEffect} from 'react';
import classes from './FeedStore.module.scss';
import NewBook from '../NewBook/NewBook';
import Book from '../Book/Book';
import {toast} from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import wallet from '../../../assets/img/wallet-solid.svg';
import store from '../../../assets/img/store-icon.png';
import axios from 'axios';
import {useConfigContext} from '../../../contexts/ConfigContexts'
import {useUserContext } from '../../../contexts/UserContext';
import Button from '../../Button/Button';

const Feed2 = (p) =>{
    const [books,setBooks]=useState([]);
    const navigate = useNavigate();  
    const [search,setSearch]=useState("");
    const [btnDisabled] = useState(false);
    const { startLoading, stopLoading,addToFavorites,RemovedToFavorites,favorites } = useConfigContext();
    const { logout, user } = useUserContext();
    const [contador,setcontador]=useState(0);
    console.log("favoritos: ", favorites );

    const favoriteChecker=(id)=>{
        const boolean= favorites.some((book)=>book._id===id);
        return boolean;
    };


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
        } finally {
            stopLoading();
        }
    }

    const sumar=()=>{
        setcontador(contador+1);
    }
    const restar=()=>{
        setcontador(contador-1);
    }

    console.log(contador);
    

    
    
    

        return (
            <div className={classes["Store"]}>
<div className={classes["header"]}>
<ul  className={classes["nav-menu"]}>
                <li className={classes["nav-menu-item"]} ><a  className={classes["nav-menu-link nav-link"]} >Cerrar sesión</a></li>
                <div className={classes["wallet-img"]} onClick={() => navigate("/wallet")} >
                <li className={classes["nav-menu-item"]}><a  className={classes["nav-menu-link nav-link-w"]} >wallet</a> <div className={classes["img"]}><img src={[wallet]}/></div></li>
                </div>
</ul>
            <div className={classes["form"]} >
            <a  className={classes["nav-link"]}>Explorar</a>
                    
                    <form >
                    <div className={classes["input"]}>
                    <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" value={search} name="search" onChange={(e)=>setSearch(e.target.value)} className={classes["search"]} placeholder="Buscar libro" />
                    </div>
                    </form>
                    <div className={classes["div-img"]}>
                    <div className={classes["img-store"]}> <p className={classes["count"]}>{contador}</p> <img src={[store]}/> </div><p>Mi carro</p>
                    
                    </div>
                </div>
    </div> 


    
    <article className={classes["prueba"]} >
    { books.filter((book)=>book.title.toLowerCase().includes(search)).map((book)=>
    
    
     <div key={book._id} className={classes["container"]}>
            <div className={classes["cards"]} >
                <div className={classes["body-cards"]}>
                <h4>Username : {book.user.username}</h4>
                    <img src={book.image}  />
                    <h2>{book.title}</h2>
                    <h2 className={classes["h2-card"]}>$ {book.precio}</h2>
                </div>
                <div className={classes["footer-cards"]}>
                   {
                    !user?
                    <>
                    <Button className={classes["btn"]} >Añadir al carrito <p>Login!</p></Button>
                    </>:
                    <>
                    {
                        favoriteChecker(book._id) ?
                        <>
                       
                       <Button  onClick={restar}>
                       <button className={classes["button"]} onClick={()=>RemovedToFavorites(book._id)}>Eliminar del carrito</button>
                       </Button>
                    
                        </>    : 
                        <> 
                        <Button  onClick={sumar}>
                        <button className={classes["button"]} onClick={()=>addToFavorites(book)}>Añadir al carrito</button> 
                        </Button>
                        </>
                    }
                    </>
                   }
                </div>
            </div>  
        </div>

    ) }
       
    </article>  
   

     
    
    
</div>

        );
    }
    export default Feed2;
