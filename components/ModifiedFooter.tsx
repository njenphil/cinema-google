import React from "react"

const ModifiedFooter = () => {
  return (
    <>
      <section className="contact section-padding">
        <div className="container">
          <h2 className="section-heading">Need Help?</h2>
          <div className="contact-body">
            <div className="contact-form">
              <form action="">
                <div className="form-control">
                  <input type="text" id="fullName" name="full-name" required />
                  <span>Full Name</span>
                </div>
                <div className="form-control">
                  <input type="text" id="email" name="email" required />
                  <span>Email</span>
                </div>
                <div className="form-control">
                  <textarea name="" id="" placeholder="Please describe your issue"></textarea>
                </div>
                <p className="terms-disclaimer">By submitting this form, I agree to all terms and conditions regarding data protection of Cinema</p>
                <div className="submit-area">
                  <button type="submit">Send</button>
                  <p className="or">OR</p>
                  <p className="alternative">
                    <i className="fab fa-whatsapp"></i>
                    <a href="#">Click to WhatsApp</a>
                  </p>
                </div>
              </form>
            </div>
            <div className="contact-image">
              <img src="/contact-image.png" alt="Contact Image" />
            </div>
          </div>
        </div>
      </section>
      <footer className="section-padding">
        <div className="container">
          <div className="copyright">
            <p>
              &copy; Cinema <span className="year">2024</span>
            </p>
          </div>
          <div className="social-media">
            <p>Connect with us</p>
            <div className="social-icons">
              <a href="#" className="circle">
                <img src="/facebook.svg" alt="cinema twitter" className="facebook-icon" />
              </a>
              <a href="#" className="circle">
                <img src="/twitter.svg" alt="cinema twitter" />
              </a>
              <a href="#" className="circle">
                <img src="/instagram.svg" alt="cinema instagram" />
              </a>
              <a href="#" className="circle">
                <img src="/linkedin (1).svg" alt="cinema instagram" />
              </a>
            </div>
          </div>
          <p>All rights reserved</p>
        </div>
      </footer>
    </>
  )
}

export default ModifiedFooter
