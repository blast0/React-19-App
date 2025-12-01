import { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
const SERVICE_ID= import.meta.env.VITE_APP_EMAIL_SERVICE_ID
const TEMPLATE_ID= import.meta.env.VITE_APP_EMAIL_TEMPLATE_ID
const PUBLIC_KEY= import.meta.env.VITE_APP_EMAIL_PUBLIC_KEY

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(emailjs)
    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        formData,
        PUBLIC_KEY
      )
      .then(
        () => {
          alert("Message sent successfully! Rest assured i will get back to soon");
          setFormData({ name: "", email: "", message: "" });
        },
        (err) => {
          alert("Failed to send message!");
        }
      );
  };

  return (
    <div className="flex items-center justify-center px-6 mt-10">
      <div className="max-w-3xl w-full rounded-2xl shadow-xl border border-white p-8 md:p-10">
        <motion.h2 className="text-3xl font-bold text-center">
          Contact Me
        </motion.h2>

        <motion.form
          onSubmit={sendEmail}
          className="mt-8 space-y-5"
        >
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
          >
            Send Message
          </motion.button>
        </motion.form>

        <div className="mt-8 text-center">
          <p>Or reach me via</p>
          <p className="font-medium">bishalkumar.sde@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
