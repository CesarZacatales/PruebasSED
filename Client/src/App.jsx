import classes from './App.module.scss';
import Header from './components/Header/Header';
import Main from './view/Main/Main';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotFoundView from './view/NotFoundView/NotFoundView';
import AuthView from './view/AuthView/AuthView';
import RegisterView from './view/BookView/RegisterView/RegisterView';
import StoreView from './view/BookView/StoreView/StoreView';
import WalletView from './view/BookView/StoreView/WalletView/WalletView';
import FeedStore from './components/Feed/FeedStore/FeedStore';
import Feed from './components/Feed/Feed';
import WalletAuth from './view/AuthView/WalletAuth/WalletAuth';

function App() {
  return (
    <div className={classes["App"]}>
    {/*header*/}
    <Header/>
    {/*main */}
    <main>
    <Routes>
      <Route index element={<Main/>} />
      <Route path='auth/*' element={<AuthView/>}/>
      <Route path='*' element={<NotFoundView/>}/>
      <Route path='sell' element={<Feed/>}/>
      <Route path='store' element={<FeedStore/>}/>
      <Route path='wallet' element={<WalletView/>}/>
      <Route path='DateUser' element={<WalletAuth/>}/>
    </Routes>
    </main>
   
    
    </div>
  )
}

export default App;
