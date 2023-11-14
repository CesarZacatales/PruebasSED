import classes from './LoginForm.module.scss';
import img from '../../../assets/img/close.png';
import img2 from '../../../assets/img/libros.jpg';
import { toast } from 'react-toastify';
import { useState } from 'react';


import Button from '../../Button/Button';


const LoginForm =({ onLogin = () => { } })=>{

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const errors = {
    "identifier": !identifier.length>0,
    "password": !password>0,
  }

  const hasErrors = () => Object.values(errors).some(error => error);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (hasErrors()) {
      toast.warn("Wrong fields");
      return;
    }

    onLogin(identifier, password);
  }

return (
    <div className={classes["container"]}>
    <section className={classes["form"]}>
    <div className={classes["container-image"]}><img src={[img2]} /></div>
    </section>
    
    <section className={classes["right-form"]}>
      <form method="post" autocomplete="off" onSubmit={onSubmitHandler}>
        <img src={[img]} alt="botón de cerrar" />
        <h2>Ingresar a tu cuenta</h2>
        <input type="text"  placeholder="Ingresa tu usuario" 
                className={errors["identifier"] ? classes["error"] : ""}
                name="identifier" value={identifier} onChange={({ target }) => { setIdentifier(target.value) }}
                autoComplete='username'
 />
    
        <input
        className={errors["password"] ? classes["error"] : ""}
            type={"password"}
            name="password"
          placeholder="Contraseña"
          autoComplete='current-password'

          value={password}
            onChange={({ target }) => { setPassword(target.value) }}
          
        />
        
          <Button type="submit" disabled={!identifier & !password}>Ingresar</Button>
       
      </form>
    </section>

    </div>
);
}
export default LoginForm;