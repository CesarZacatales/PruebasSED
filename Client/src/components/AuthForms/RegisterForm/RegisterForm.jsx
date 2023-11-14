import classes from './RegisterForm.module.scss';
import img from '../../../assets/img/close.png';
import Button from '../../Button/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';

const RegisterForm=({ onRegister = () => { } })=>{
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const errors = {
    "username": !username || username.length < 4 || username.length > 32,
    "email": !email,
    "password": !password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/.test(password),
    "re-password": !rePassword || password !== rePassword
  }

  const hasErrors = () => Object.values(errors).some(error => error);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    

    if (hasErrors()) {
      toast.warn("Wrong fields!");
      return;
    }

    onRegister(username, email, password);
    setUsername("");
    setEmail("");
    setPassword("");
    setRePassword("");
  }

return (
    <div className={classes["container"]}>
    <form method="post" className={classes["form-register"]} autocomplete="off" onSubmit={onSubmitHandler}>
      
      <div className={classes["container-label"]}><div className={classes["label-signup"]}><h2>Registro</h2> </div>
      <figure className={classes["img"]}><img src={[img]} alt="botón de cerrar" /></figure></div>
      <div className={classes["container-input"]}>
      <input
         className={errors["username"] ? classes["error"] : classes["controls-2"]}
        type="text"
        placeholder="e.g. supernick33"
        name="username"
        value={username}
            onChange={({ target }) => { setUsername(target.value) }}
        required
      />
      
      <input type="email" name="email" placeholder="e.g. example@example.com"
            autoComplete="email" value={email}
            onChange={({ target }) => { setEmail(target.value) }} 
            className={errors["email"] ? classes["error"] : classes["controls-2"]} />
      <input
           className={errors["password"] ? classes["error"] : classes["controls-2"]}
            type={"password"}
            autoComplete="new-password"
            placeholder="A strong password"
            name="password"
            value={password}
            onChange={({ target }) => { setPassword(target.value) }}
        required
      />
      <input
        className={errors["re-password"] ? classes["error"] : classes["controls-2"]}
            type={"password"}
            autoComplete="new-password"
            placeholder="Repeat the strong password"
            name="re-password"
            value={rePassword}
            onChange={({ target }) => { setRePassword(target.value) }}
            required
      />
      </div>
      <div className={classes["Button"]}>
          <Button type="submit" disabled={hasErrors()}>Crear cuenta</Button>
        </div>

    </form>

    </div>
);
}
export default RegisterForm;