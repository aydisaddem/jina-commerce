import '../../styles/landing.css';
import MainCarousel from './MainCarousel';
import BrandCarousel from './BrandCarousel';
import { NavLink } from 'react-router-dom';
const Landing = () => {


  
  return (

      <div id="landing">
        <MainCarousel />
        <BrandCarousel/>
     
      </div>

  );
};

export default Landing;
