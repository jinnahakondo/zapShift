import React, { use } from 'react';

const FAQ = ({ faqPromise }) => {
    const faqs = use(faqPromise)
    return (
        <div>
            <h2 className='text-xl md:text-2xl lg:text-4xl font-extrabold text-secondary mb-4'>Frequently Asked Question (FAQ)</h2>
            <p className='text-accent'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>

            <div className='mt-10'>
                {faqs.map(faq => <details key={faq.id} className="collapse bg-base-100  border-2 border-base-300 open:border-[#067A87] open:bg-[#C3DFE2] mb-4" name="my-accordion-det-1" open>
                    <summary className="collapse-title font-semibold">{faq.question}</summary>
                    <div className="collapse-content text-sm">{faq.answer}</div>
                </details>)}

            </div>
        </div>
    );
};

export default FAQ;