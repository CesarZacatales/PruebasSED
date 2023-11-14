import NewBook from '../../../components/Feed/NewBook/NewBook';
import classes from './RegisterView.module.scss';

const RegisterBook = () =>{
return(
    <div className={classes["feed-wrapper"]}>
    <NewBook/>
    </div>
);
}
export default RegisterBook;