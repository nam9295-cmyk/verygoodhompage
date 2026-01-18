const faqItems = [
    {
        question: "What is the price range?",
        answer: "Prices vary by product. Individual items start from 5,000 KRW, and gift sets range from 20,000 to 50,000 KRW."
    },
    {
        question: "Do you offer nationwide shipping?",
        answer: "Yes, we ship nationwide. Products are packed with ice packs to maintain freshness and typically arrive within 2-3 days."
    },
    {
        question: "What makes Very Good Chocolate special?",
        answer: "We follow a 'Less Sweet, More Deep' philosophy. Crafted bean-to-bar by a Le Cordon Bleu chocolatier in a HACCP-certified facility."
    },
    {
        question: "Is gift packaging available?",
        answer: "We use premium triangular packaging inspired by traditional Korean aesthetics. It's eco-friendly and perfect for gifting."
    },
    {
        question: "Can I visit the store?",
        answer: "Yes, visit us at 1st Floor, 13 Sangnok-ro 11-gil, Suseong-gu, Daegu. Open Mon-Fri 10-19, Sat 11-18 (Closed Sundays)."
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
