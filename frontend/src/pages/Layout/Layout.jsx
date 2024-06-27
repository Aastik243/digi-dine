import { Outlet } from "react-router-dom";
import styles from './Layout.module.css';
import Header from "../../components/Header/Header";
import Navbar from "../navbar/navbar";

const Home = () => {
  return (
    <>
     <Navbar />
      
          <Outlet />
          </>
       
  );
};

export default Home;
