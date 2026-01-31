const faqItems = [
    {
        question: "Do you ship internationally?",
        answer: "Yes. We ship internationally from Korea. Delivery times vary by destination and customs processing."
    },
    {
        question: "Will I pay customs or import duties?",
        answer: "International orders may be subject to customs duties or taxes. These charges are the buyer's responsibility."
    },
    {
        question: "What is your return policy for food items?",
        answer: "For food safety, edible items are non-returnable unless they arrive damaged or incorrect. Contact us with photos."
    },
    {
        question: "What makes Very Good Chocolate special?",
        answer: "We follow a 'Less Sweet, More Deep' philosophy, crafted in small batches with careful ingredient selection."
    },
    {
        question: "Can I visit the store?",
        answer: "Yes. Visit us at 1F 13 Sangnok-ro 11-gil, Suseong-gu, Daegu. Hours may vary by season."
    }
];

export default function FAQSection() {
    return (
        <section className="section faq-minimal" id="faq">
            <div className="faq-container">
                {faqItems.map((item, index) => (
                    <details key={index} className="faq-item">
                        <summary className="faq-question">{item.question}</summary>
                        <div className="faq-answer">
                            <p>{item.answer}</p>
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}
