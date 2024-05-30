import React from 'react'
import './contact.css'
import './contact2.css'


const Contact = () => {
    return (
        <section className="section">
            <h2 className="heading">Contact <span>Us</span></h2>

            <form action="#">
                <div className="input-box">
                    <input type="text" placeholder="Full Name" required="" />
                    <input type="email" placeholder="E-mail" required="" />
                </div>

                <div className="input-box">
                    <input type="number" placeholder="Age" required="" />
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder="Your Message" required=""></textarea>
                <input type="submit" value="Send Message" className="btn" />
            </form>
        </section>
    )
}
export default Contact;
