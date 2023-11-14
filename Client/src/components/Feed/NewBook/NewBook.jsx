import classes from './NewBook.module.scss';
import Button from '../../Button/Button';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const NewBook = ({onAddBooks=()=>{}}) => {
  const [imageField, setImage] = useState("");
  const [titleField, setTitle] = useState("");
  const [precioField, setPrecio] = useState("");
  const navigate = useNavigate();

  const errors = {
    "image": imageField.length>0 && !(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi).test(imageField) || !imageField,
    "title": !titleField,
    "precio": !precioField 
  }
  
  const hasErrors = () => {
    return Object.values(errors).some(error => error);
  }


    const onSubmitHandler = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target);
        onAddBooks(data.get("image"),data.get("title"),data.get("precio"));

        setImage("");
        setTitle("");
        setPrecio("");
    }
  

    return(
        <div className={classes["container"]}>
    <form  className={classes["form-sale-book"]} onSubmit={onSubmitHandler}>

      <div className={classes["div-input"]}>
      <label className={classes["position-label-4"]}>Imagen 
      <input type="url"  name="image" value={imageField} 
      onChange={(e) => { setImage(e.target.value) }} 
        className={errors["image"] ? classes["error"] : ""} placeholder='https://example.io/image.png'  />
      </label>
      </div>
      
       
      <div className={classes["div-input"]}>
      <label htmlFor="titulo" className={classes["position-label-1"]}>Titulo
      <input type="text"  name="title"  value={titleField} onChange={(e) => { setTitle(e.target.value) }} 
      className={errors["title"] ? classes["error"] : classes["controls input-1"]} /></label>
      </div>
      
      <div className={classes["div-input"]}>
      <label htmlFor="precio" className={classes["position-label-6"]}>Precio
       <input type="number"  name="precio" min="1" pattern="^[0-9]+"  className={errors["precio"] ? 
      classes["error"] : classes["controls input-3"]} value={precioField} onChange={(e) => { setPrecio(e.target.value) }}
      placeholder='$' />
      </label>
     </div>

      
      <div className={classes["Button"]}><Button className={classes["btn-style-1"]} onClick={() => navigate("/")} >Volver</Button>
      <Button className={classes["btn-2"]} disabled={hasErrors()} type="submit">Vender libro</Button></div>
      
    </form>
    </div>
    );
}
export default NewBook;