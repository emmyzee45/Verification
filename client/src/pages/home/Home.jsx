import Footer from "../../components/footer/Footer";
import "./home.css";

const Intro = () => {
  return (
    <div className="homeContainer">
      {/* <div className="hometop">
        <img src="https://firebasestorage.googleapis.com/v0/b/cardano-d265c.appspot.com/o/bg-3.jpg?alt=media&token=3ccacd72-ce76-458d-b779-a2dd86111c0d" className="homeimg"/>
        <div className="hometext">Verifications</div>
      </div> */}
      <section className="features ptb-60 bg_img-2" data-background="#/public/frontend/images/element/fbg.png" style={{backgroundImage: "url(&quot;#/public/frontend/images/element/fbg.png&quot;);"}}>
    <div className="container mx-auto">
        <div className="text-content">
            <h4>OUR FEATURES</h4>
            <h3>SIMver - Carrier Phone Number Providers</h3>
        </div>
        <div className="row g-3 pt-40">
                            <div className="col-lg-4 col-md-6 col-12 aos-init aos-animate" data-aos="zoom-in">
                    <div className="card">
                        <div className="d-flex">
                            <div className="thumb">
                                <img src="./SIMver_files/Easy-to-Sign-Up.png" alt="icon" />
                            </div>
                            <div>
                                <h3>Carrier SIM Service</h3>
                                <p>We are the provider of original carrier (Real SIM) Phone numbers, we make it easier for you to bypass VOIP, our Multipurpose lines is acceptable for any services.</p>
                            </div>
                        </div>
                    </div>
                </div>
                            <div className="col-lg-4 col-md-6 col-12 aos-init aos-animate" data-aos="zoom-in">
                    <div className="card">
                        <div className="d-flex">
                            <div className="thumb">
                                <img src="./SIMver_files/Activity-Tracking.png" alt="icon" />
                            </div>
                            <div>
                                <h3>Instant SMS</h3>
                                <p>Our Always-On programmed service is standby, processes and effortlessly receive instant SMS all in nano seconds.</p>
                            </div>
                        </div>
                    </div>
                </div>
                            <div className="col-lg-4 col-md-6 col-12 aos-init aos-animate" data-aos="zoom-in">
                    <div className="card">
                        <div className="d-flex">
                            <div className="thumb">
                                <img src="./SIMver_files/Trusted-and-Legitimate.png" alt="icon" />
                            </div>
                            <div>
                                <h3>Call &amp; SMS Forwarding</h3>
                                <p>Embrace a new way to spoof, re-route and wear different identify through our SMS and call forwarding phones.</p>
                            </div>
                        </div>
                    </div>
                </div>
                            <div className="col-lg-4 col-md-6 col-12 aos-init aos-animate" data-aos="zoom-in">
                    <div className="card">
                        <div className="d-flex">
                            <div className="thumb">
                                <img src="./SIMver_files/Safe.png" alt="icon" />
                            </div>
                            <div>
                                <h3>Retain numbers</h3>
                                <p>Enjoy a new way to own a private phone number, maintained, control and easy access for as long as you need.</p>
                            </div>
                        </div>
                    </div>
                </div>
                            <div className="col-lg-4 col-md-6 col-12 aos-init aos-animate" data-aos="zoom-in">
                    <div className="card">
                        <div className="d-flex">
                            <div className="thumb">
                                <img src="./SIMver_files/Cheap-Exchange-Rate.png" alt="icon" />
                            </div>
                            <div>
                                <h3>Easy Payment</h3>
                                <p>Enjoy timesless flow of easy payments and wallet deposits of all kinds of cryptocurrency, Card and coupon payments.</p>
                            </div>
                        </div>
                    </div>
                </div>
                            <div className="col-lg-4 col-md-6 col-12 aos-init aos-animate" data-aos="zoom-in">
                    <div className="card">
                        <div className="d-flex">
                            <div className="thumb">
                                <img src="./SIMver_files/247-Support.png" alt="icon" />
                            </div>
                            <div>
                                <h3>Security and Support</h3>
                                <p>Rely on top-notch security, privacy guarranty and services assistance by our experts dedicated customer support.</p>
                            </div>
                        </div>
                    </div>
                </div>
         </div>
    </div>
</section>
<footer class="footer-section">
        
        <div class="col-xl-4 col-lg-4 mb-50">
            
        <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
            <div class="footer-widget">
               
                    <button type="button" style={{border: "0px none; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: 0px -1px -1px 0px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap;"}}>Generate new mask</button>
                
    </div>
</div>
</div>
<div class="copyright-area">
<div class="container">
    <div class="row">
        <div class="col-12 text-center text-lg-left">
            <div class="copyright-text">
                <p>Copyright © 2023, All Right Reserved <a href="#">SIMver</a>
                </p>
            </div>
        </div>
    </div>
</div>
</div>
</footer>
      {/* <Footer /> */}
    </div>
  );
};

export default Intro;
