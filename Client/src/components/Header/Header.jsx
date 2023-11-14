import classes from './Header.module.scss';
import {useEffect} from 'react';
import flecha from '../../assets/img/flecha.png';
import {ImBook } from "react-icons/im";
import { useNavigate, Link } from 'react-router-dom';
import Button from '../Button/Button';
import { useUserContext } from '../../contexts/UserContext';


const Header = () => {
    const { logout, user } = useUserContext();
    const navigate = useNavigate();

 

    return(
        <header className={classes["Header"]}>

        <div className={classes["container_header"]}>

        <div className={classes["div_header_1"]}>
                <div className={classes["header_img"]} onClick={() => navigate("/")} >
                <div>
                <ImBook/>
                </div>
                <h2>Books</h2>
                </div>

              {
                !user?
                <>
                <ul className={classes["list"]}>
                    <li><a onClick={() => navigate("/store")}>Tienda</a></li>
                </ul>  
                </>:
                <>
                <ul className={classes["list"]}>
                    <li><a onClick={() => navigate("/store")}>Tienda</a></li>
                    <li><a onClick={() => navigate("/sell")}>Vender libro</a></li>
                    <li><a onClick={() => navigate("/DateUser")}>Wallet</a></li>
                </ul>  
                </>
              }
                      
        </div>

        <div className={classes["Button"]}>
        {
            !user ?
            <>
            <ul className={classes["list_two"]}>
                      <Button onClick={() => navigate("/auth/signin")}>Iniciar sesión</Button>
                 </ul>
                 <Button onClick={() => navigate("/auth/signup")}>Crear cuenta <div><img src={flecha} /></div></Button>
            </>:
            <>
            <>
              <Button  onClick={() => { logout()}  }  > Sign out </Button>
            </>
            </>
        }
                
        </div>

        </div>

        </header>    

    );

}
export default Header;