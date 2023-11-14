import classes from './WalletView.module.scss';
import semanzky from '../../../../assets/img/semanzky.png';
import { useNavigate, Link } from 'react-router-dom';
import {useConfigContext} from '../../../../contexts/ConfigContexts';
import Button from '../../../../components/Button/Button';


const WalletView = () => {
    const navigate=useNavigate();
    const {addToFavorites,RemovedToFavorites,favorites} = useConfigContext();
    const favoriteChecker=(id)=>{
        const boolean= favorites.some((book)=>book._id===id);
        return boolean;
    };
return(

    <div className={classes["wallet"]}>
        
<div className={classes["header"]}>
    <h2>Tu carro</h2>
    <h2 className={classes["h2"]} onClick={() => navigate("/store")}>x</h2>
</div>
<hr/>
<div>
  

<div className={classes["container"]}>
        {
            favorites.length>0 ? favorites.map((book)=>{
                
        <div  key={book._id}  className={classes["cardParts"]}>
            <div className={classes["img"]}>
                <figure><img src={book.image} /></figure>
            </div>
            <div className={classes["datos"]}>
                <div className={classes["contenedor-datos"]}>
                    <h2>{book.title}</h2>
                    <h3>${book.precio}</h3>
                    <button>Eliminar</button>
                </div>
            </div>
            <div className={classes["contador"]}>
                <div className={classes["cantidad"]}><h3>1</h3></div>
            </div>
             </div>
             {
                favoriteChecker(book._id) ? (
                    <Button onClick={()=>RemovedToFavorites(book._id)}> Eliminar</Button>
                ) :
                (
                    <Button onClick={()=>addToFavorites(book)}>Añadir</Button>
                )

             }

            }):
            <>
                <h1>No hay libros añadidos</h1>
            </>
            }
            </div>

</div>
<hr/>
    <div className={classes["footer"]}>
    <h2>Subtotal</h2>
    <button className={classes["pago"]}>Continuar con el pago</button>
    <h2 className={classes["precio"]}>$10.99</h2>
    </div>

</div>
);
}
export default WalletView;