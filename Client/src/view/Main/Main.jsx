import classes from './Main.module.scss';
import logo from '../../assets/img/book_education.png';
import {HiMagnifyingGlass } from "react-icons/hi2";

const Main = () => {
    return(
        <main className={classes["Main"]}>
        <div className={classes["main_b"]}>
            <div className={classes["main_book"]}>
            <p className={classes["size_p"]}> libros de poder para superar tus límites mentales</p>
            <p className={classes["size_p2"]}>Involucrarse en la educación con dedicación es una buena meditación durante años</p>
            
                <form >
                    <div className={classes["input"]}>
                    <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" name="" className={classes["search"]} placeholder="Buscar libro" />
                    </div>
                </form>
            </div>
        </div> 
        
        <div className={classes["content_img"]}>
        <img  src={logo} />
        </div>

        </main>
    );
}
export default Main;