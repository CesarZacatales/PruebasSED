import Button from '../../../components/Button/Button';
import classes from './WalletAuth.module.scss';
import { useUserContext } from '../../../contexts/UserContext';
import axios from "axios";
import { useEffect, useState } from "react";
import {useConfigContext} from '../../../contexts/ConfigContexts';


const WalletAuth = () => {
const [users,setUsers]= useState([]);
      const { token, user } = useUserContext();
      const { startLoading, stopLoading } = useConfigContext();


      useEffect(() => {
        //Obtener la info del usuario
        fetchUserInfo();
      }, []);


      const fetchUserInfo = async (username,saldo) => {
        try {
          const { data } = await axios.get("/auth/whoami",{username,saldo});
          setUsers(data);
          startLoading();
        
        } catch (error) {
        } finally {
          stopLoading();
        }
      }


    return(
        <div className={classes["wallet"]}>
<section>

<div className={classes["card"]}>
    <div className={classes["card_1"]}>
        <div className={classes["circle"]}></div>
        <div className={classes["div_p"]}><p>Hola</p>
            <p>{users.username}</p>
        </div>
        <div className={classes["btn_exit"]}>X</div>
    </div>
    <hr className={classes["hr1"]}/>

    <div className={classes["card_2"]}>
        <p>Tu saldo</p>
        <p>$ {users.saldo}</p>
        <Button>Agregar fondos</Button>
    </div> 

    <hr className={classes["hr2"]}/>

    <div className={classes["card_3"]}>
        <p>Historial de transacciones</p>
    </div>
</div> 

</section>
</div>
    );
}
export default WalletAuth;
