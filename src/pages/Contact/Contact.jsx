import { motion } from "framer-motion";
const Contact = () => {
  return (
    <div>
        {/* CONTACT */}
        <section id="contact" className="mt-16">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="mt-2 text-slate-600">Want to work together or just say hi? Send a message.</p>

          <motion.form
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-6 grid md:grid-cols-2 gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              // Replace with your form handler
              alert("Thanks! Replace this with a real submit handler.");
            }}
          >
            <input name="name" placeholder="Your name" className="p-3 border rounded-md w-full" />
            <input name="email" placeholder="you@domain.com" className="p-3 border rounded-md w-full" />
            <textarea name="message" placeholder="Message" className="p-3 border rounded-md w-full md:col-span-2" rows={5} />
            <div className="md:col-span-2 flex items-center justify-between">
              <div className="text-sm text-slate-500">Or email me at <a href="mailto:you@example.com" className="underline">you@example.com</a></div>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Send</button>
            </div>
          </motion.form>
        </section>
    </div>
  )
}

export default Contact
