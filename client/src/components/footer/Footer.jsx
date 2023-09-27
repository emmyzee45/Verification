import React from 'react';
import "../../App.css";


function Footer() {
  return (
    <footer className="bg-gray-50" aria-labelledby="footer-heading" style={{backgroundColor: "#fff"}}>
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-medium text-gray-900">Links</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li><a href="/" className="text-base text-gray-500 hover:text-gray-900">FAQ</a></li>
                  <li><a href="/" className="text-base text-gray-500 hover:text-gray-900">Terms</a></li>
                  <li><a href="/" className="text-base text-gray-500 hover:text-gray-900">Policy</a></li>
                  <li><a href="/" className="text-base text-gray-500 hover:text-gray-900">Help</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-base font-medium text-gray-900">Services</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li><a href="/" className="text-base text-gray-500 hover:text-gray-900">On Demand</a></li>
                  <li><a href="/" className="text-base text-gray-500 hover:text-gray-900">API</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-medium text-gray-900">Contact</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li><a href="/" className="text-base text-gray-500 hover:text-gray-900">Contact Us</a></li>
                  <li><a href="https://www.textverified.com/blog" className="text-base text-gray-500 hover:text-gray-900">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">Social</h3>
                <div className="flex gap-3">
                  <div className="p-2 bg-gray-500 rounded-full w-9 h-9">
                    <a className="anchor-style-none" href="/">
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/cardano-d265c.appspot.com/o/facebook.png?alt=media&token=e8e5e476-9231-4124-a836-bdeb6a11af69`}
                        alt="Facebook"
                        style={{ width: '25px' }}
                      />                    </a>
                  </div>
                  <div className="p-2 bg-gray-500 rounded-full w-9 h-9">
                    <a className="anchor-style-none" href="/">
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/cardano-d265c.appspot.com/o/instagram.png?alt=media&token=f75eb17e-fdde-4d0f-a161-4d16218bd391`}
                        alt="Instagram"
                        style={{ width: '25px' }}
                      />                    </a>
                  </div>
                  <div className="p-2 bg-gray-500 rounded-full w-9 h-9">
                    <a className="anchor-style-none" href="/">
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/cardano-d265c.appspot.com/o/linkedin.png?alt=media&token=da7dadcc-e1f2-41f6-b232-f0f5c7cf0b5c`}
                        alt="LinkedIn"
                        style={{ width: '25px' }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 xl:mt-0">
            <h3 className="text-lg font-medium text-gray-900">Textverified</h3>
            <p className="mt-4 text-base text-gray-500">
              We are the premier one-stop shop for all your SMS and text verification needs. Exceptional service and competitive pricing set us apart from the rest.
            </p>
            <p className="mt-4 text-base text-gray-500">
              © 2023 textverified.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;