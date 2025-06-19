'use client';
import React, { useRef, useState } from 'react';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuOne from '@/components/Header/Menu/MenuOne';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';

const ContactUs = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setSuccessMsg('');
    setErrorMsg('');
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    formData.append('category', selectedCategory); // add selected category

    try {
      const response = await fetch('https://seagultrades.com/send-mail.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMsg('Message sent successfully!');
        formRef.current.reset();
        setSelectedCategory('');
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMsg('Error sending message. Please check your internet or try later.');
    }

    setSending(false);
  };

  return (
    <>
      {/* <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" /> */}
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Breadcrumb heading="Contact us" subHeading="Contact us" />
      </div>

      <div className="contact-us md:py-20 py-10">
        <div className="container">
          <div className="flex justify-between max-lg:flex-col gap-y-10">
            <div className="left lg:w-2/3 lg:pr-4">
              <div className="heading3">Drop Us A Line</div>
              <div className="body1 text-secondary2 mt-3">
                Use the form below to get in touch with the sales team
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="md:mt-6 mt-4">
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 gap-y-5">
                  <div className="name">
                    <input
                      name="username"
                      className="border-line px-4 py-3 w-full rounded-lg"
                      type="text"
                      placeholder="Your Name *"
                      required
                    />
                  </div>
                  <div className="email">
                    <input
                      name="email"
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      type="email"
                      placeholder="Your Email *"
                      required
                    />
                  </div>

                  <div className="category sm:col-span-2">
                    <label className="block mb-2 font-semibold">Select Category:</label>
                    <div className="flex flex-wrap gap-2">
                      {['Men', 'Women', 'Kids', 'Summer', 'Winter', 'Working Wear'].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 py-2 border rounded-lg transition ${
                            selectedCategory === cat
                              ? 'bg-black text-white border-black'
                              : 'border-gray-300 hover:bg-black hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="message sm:col-span-2">
                    <textarea
                      name="message"
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      rows={3}
                      placeholder="Your Message *"
                      required
                    />
                  </div>
                </div>

                <div className="block-button md:mt-6 mt-4">
                  <button type="submit" className="button-main" disabled={sending}>
                    {sending ? 'Sending...' : 'Send message'}
                  </button>
                  {successMsg && <p className="mt-2 text-green-600">{successMsg}</p>}
                  {errorMsg && <p className="mt-2 text-red-600">{errorMsg}</p>}
                </div>
              </form>
            </div>

            <div className="right lg:w-1/4 lg:pl-4">
              <div className="item">
                <div className="heading4">Our Store</div>
                <p className="mt-3">
                  2163 Phillips Gap Rd, West Jefferson, North Carolina, United States
                </p>
                <p className="mt-3">
                  Phone: <span className="whitespace-nowrap">+31687113810</span>
                </p>
                <p className="mt-1">
                  Email: <span className="whitespace-nowrap">info@seagultrades.com</span>
                </p>
              </div>

              <div className="item mt-10">
                <div className="heading4">Open Hours</div>
                <p className="mt-3">
                  Mon - Fri: <span className="whitespace-nowrap">7:30am - 8:00pm PST</span>
                </p>
                <p className="mt-3">
                  Saturday: <span className="whitespace-nowrap">8:00am - 6:00pm PST</span>
                </p>
                <p className="mt-3">
                  Sunday: <span className="whitespace-nowrap">9:00am - 5:00pm PST</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
