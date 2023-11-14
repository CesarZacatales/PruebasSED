import classes from './SingleBook.module.scss';

const SingleBook = ({ image = "",title = "", precio = "",user="" }) => {
  return (
    <article className={classes["prueba"]} >
       <div className={classes["container"]}>
            <div className={classes["cards"]} >
                <div className={classes["body-cards"]}>
                <h4>Username : {user}</h4>
                    <img src={image}  />
                    <h2>{title}</h2>
                    <h2 className={classes["h2-card"]}>$ {precio}</h2>
                </div>
                <div className={classes["footer-cards"]}>
                    <button className={classes["btn1"]}>Añadir al carrito</button>
                </div>
            </div>  
        </div>
    </article>
  );
}
export default SingleBook;