import Features from "../../components/features/Features";
import Footer from "../../components/footer/Footer";
import Notice from "../../components/notice/Notice";
import Sitemap from "../../components/sitemap/Sitemap";
import "./home.css";

const Intro = () => {
  
  return (
    <div>
    <div className="homeContainer">
      <Notice message="While we are working to  improve user experience  on 
      Multi-purpose permanent service lines, Simver services will be actively 
      running on single lines (both temporary and permanent) to increase stability in your usages." />
      {/* <div className="hometop">
        <img src="https://firebasestorage.googleapis.com/v0/b/cardano-d265c.appspot.com/o/bg-3.jpg?alt=media&token=3ccacd72-ce76-458d-b779-a2dd86111c0d" className="homeimg"/>
        <div className="hometext">Verifications</div>
      </div> */}
        <Features /> 
    </div>
      <Sitemap />   
    <Footer />
    </div>
  );
};

export default Intro;
