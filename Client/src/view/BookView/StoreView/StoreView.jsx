import classes from './StoreView.module.scss';
import wallet from '../../../assets/img/wallet-solid.svg';
import store from '../../../assets/img/store-icon.png';
import { useNavigate, Link } from 'react-router-dom';



const StoreView = () => {

    const navigate = useNavigate();  

return(
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
                    
                    <form>
                    <div className={classes["input"]}>
                    <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" name="" className={classes["search"]} placeholder="Buscar libro" />
                    </div>
                    </form>
                    <div className={classes["div-img"]}>
                    <div className={classes["img-store"]}><img src={[store]}/> </div><p>Mi carro</p>
                    </div>
                </div>
    </div>
    
</div>);
}
export default StoreView;