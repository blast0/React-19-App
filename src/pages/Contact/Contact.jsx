import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-10">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-10">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 text-center"
        >
          Contact Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-2 text-center text-gray-600"
        >
          Got a question, proposal or want to work together? Send a message!
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 space-y-5"
        >
          <div>
            <label htmlFor="name" className="text-gray-700 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="text-gray-700 font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message..."
              required
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700"
          >
            Send Message
          </motion.button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 text-center text-gray-600"
        >
          <p>Or reach me via</p>
          <p className="font-medium text-gray-800">bishalkumar.sde@gmail.com</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
