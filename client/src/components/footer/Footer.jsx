import React from 'react';
import "../../App.css";
import "./footer.css";


function Footer() {
  return (
    <footer class="footer-section">
        
        <div class="col-xl-4 col-lg-4 mb-50 footer-top">
            
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
  );
}

export default Footer;