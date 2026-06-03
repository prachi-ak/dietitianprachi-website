import { Mail, Linkedin, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-sage-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="section-label">Contact</p>
            <h2 className="section-heading text-4xl mb-6">Get in Touch</h2>
            <p className="font-sans text-sage-600 text-base leading-relaxed mb-8">
              For any questions not covered in the FAQ, or to discuss a corporate nutrition
              programme, please reach out directly. Prachi aims to respond within one business
              day.
            </p>

            <div className="flex flex-col gap-5">
              <a
                href="mailto:prachi@dietitianprachi.co.uk"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-sage-100 border border-sage-200 flex items-center justify-center flex-shrink-0 group-hover:bg-sage-200 transition-colors">
                  <Mail size={16} className="text-sage-600" />
                </div>
                <div>
                  <p className="font-sans text-xs text-sage-400 uppercase tracking-widest mb-0.5">Email</p>
                  <p className="font-sans text-sm text-sage-700 group-hover:text-sage-500 transition-colors">
                    prachi@dietitianprachi.co.uk
                  </p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/prachi-acharekar-97a45133/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-sage-100 border border-sage-200 flex items-center justify-center flex-shrink-0 group-hover:bg-sage-200 transition-colors">
                  <Linkedin size={16} className="text-sage-600" />
                </div>
                <div>
                  <p className="font-sans text-xs text-sage-400 uppercase tracking-widest mb-0.5">LinkedIn</p>
                  <p className="font-sans text-sm text-sage-700 group-hover:text-sage-500 transition-colors">
                    Prachi Acharekar
                  </p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/prachi.acharekar?igsh=czdjYTdkM3Qyb2R2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-sage-100 border border-sage-200 flex items-center justify-center flex-shrink-0 group-hover:bg-sage-200 transition-colors">
                  <Instagram size={16} className="text-sage-600" />
                </div>
                <div>
                  <p className="font-sans text-xs text-sage-400 uppercase tracking-widest mb-0.5">Instagram</p>
                  <p className="font-sans text-sm text-sage-700 group-hover:text-sage-500 transition-colors">
                    @prachi.acharekar
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-white border border-sage-100 rounded-lg p-8">
            <p className="font-serif text-sage-800 text-xl mb-6">Send a Message</p>
            <form
              action="mailto:prachi@dietitianprachi.co.uk"
              method="get"
              encType="text/plain"
              className="flex flex-col gap-4"
            >
              <div>
                <label className="font-sans text-xs text-sage-500 uppercase tracking-widest block mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-sage-200 rounded px-4 py-2.5 text-sm font-sans text-sage-800 bg-white focus:outline-none focus:border-sage-400 transition-colors"
                />
              </div>
              <div>
                <label className="font-sans text-xs text-sage-500 uppercase tracking-widest block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-sage-200 rounded px-4 py-2.5 text-sm font-sans text-sage-800 bg-white focus:outline-none focus:border-sage-400 transition-colors"
                />
              </div>
              <div>
                <label className="font-sans text-xs text-sage-500 uppercase tracking-widest block mb-1.5">
                  Message
                </label>
                <textarea
                  name="body"
                  rows={4}
                  required
                  className="w-full border border-sage-200 rounded px-4 py-2.5 text-sm font-sans text-sage-800 bg-white focus:outline-none focus:border-sage-400 transition-colors resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full text-center">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
