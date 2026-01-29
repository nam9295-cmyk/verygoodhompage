import React from 'react';

const RefundPolicy = () => {
    return (
        <div className="legal-page-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 20px 60px', lineHeight: '1.6' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '30px', fontWeight: 'bold' }}>Refund & Return Policy</h1>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>1. Overview</h2>
                <p>We value your satisfaction. If you are not entirely satisfied with your purchase, we're here to help. This policy applies to all international orders shipped from Very Good Co., Ltd.</p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>2. Broken or Wrong Items</h2>
                <p>If you receive a damaged, defective, or incorrect item, <strong>we offer a 100% refund or a free replacement.</strong></p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                    <li>Please contact us within 7 days of receiving your order at verygoutchocolate@gmail.com.</li>
                    <li>Include your order number and clear photos of the damaged or incorrect item.</li>
                    <li>We will process your refund or send a replacement as quickly as possible at no additional cost to you.</li>
                </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>3. Change of Mind</h2>
                <p>We accept returns for "change of mind" under the following conditions:</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                    <li>You must contact us within 7 days of receiving your item.</li>
                    <li>The item must be unused, in the same condition that you received it, and in the original packaging.</li>
                    <li><strong>The customer is responsible for all return shipping costs.</strong> Shipping costs are non-refundable.</li>
                    <li>Once your return is received and inspected, we will notify you of the approval or rejection of your refund.</li>
                    <li>If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment.</li>
                </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>4. Non-Returnable Items</h2>
                <p>Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods.</p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>5. Shipping Returns</h2>
                <p>To return your product, you should mail your product to: 1F 13 Sangnok-ro 11-gil, Suseong-gu, Daegu, 42014, Republic of Korea.</p>
                <p>You will be responsible for paying for your own shipping costs for returning your item. Depending on where you live, the time it may take for your exchanged product to reach you may vary.</p>
            </section>

            <section>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>6. Contact Us</h2>
                <p>If you have any questions on how to return your item to us, contact us at verygoutchocolate@gmail.com.</p>
            </section>
        </div>
    );
};

export default RefundPolicy;
