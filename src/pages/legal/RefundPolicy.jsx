import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const RefundPolicy = () => {
    const { isKr } = useLanguage();

    return (
        <div className="legal-page-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 20px 60px', lineHeight: '1.6' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '30px', fontWeight: 'bold' }}>
                {isKr ? '환불/반품 정책' : 'Refund & Return Policy'}
            </h1>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
                    1. {isKr ? '개요' : 'Overview'}
                </h2>
                <p>
                    {isKr
                        ? '고객 만족을 최우선으로 하며 문제 발생 시 신속하고 공정하게 처리합니다. 본 정책은 Very Good Co., Ltd.에서 출고된 주문에 적용됩니다.'
                        : 'We value your satisfaction and aim to resolve issues quickly and fairly. This policy applies to orders shipped from Very Good Co., Ltd.'}
                </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
                    2. {isKr ? '파손/불량/오배송' : 'Damaged, Defective, or Incorrect Items'}
                </h2>
                <p>
                    {isKr
                        ? '상품이 파손되었거나 불량/오배송된 경우 교환 또는 환불을 제공합니다.'
                        : 'If your order arrives damaged, defective, or incorrect, we offer a replacement or refund.'}
                </p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                    <li>{isKr ? '수령 후 7일 이내에 verygoutchocolate@gmail.com 으로 연락해 주세요.' : 'Please contact us within 7 days of receiving your order at verygoutchocolate@gmail.com.'}</li>
                    <li>{isKr ? '주문번호와 파손/오배송 사진을 함께 보내주세요.' : 'Include your order number and clear photos of the damaged or incorrect item.'}</li>
                    <li>{isKr ? '확인 후 교환 또는 환불을 신속히 처리합니다.' : 'We will process your refund or send a replacement as quickly as possible at no additional cost to you.'}</li>
                </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
                    3. {isKr ? '변심 반품(비식품만)' : 'Change of Mind (Non-Food Items)'}
                </h2>
                <p>
                    {isKr
                        ? '식품을 제외한 상품에 한해 변심 반품을 아래 조건으로 진행할 수 있습니다.'
                        : 'For non-food items only, we may accept returns for change of mind under the following conditions:'}
                </p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                    <li>{isKr ? '수령 후 14일 이내에 접수해야 합니다.' : 'You must contact us within 14 days of receiving your item.'}</li>
                    <li>{isKr ? '미개봉/미사용 상태이며 원래 포장 상태여야 합니다.' : 'The item must be unused, in the same condition that you received it, and in the original packaging.'}</li>
                    <li>{isKr ? '반품 배송비는 고객 부담이며 배송비는 환불되지 않습니다.' : 'The customer is responsible for all return shipping costs. Shipping costs are non-refundable.'}</li>
                    <li>{isKr ? '반품 검수 후 승인/거절 여부를 안내합니다.' : 'Once your return is received and inspected, we will notify you of the approval or rejection of your refund.'}</li>
                    <li>{isKr ? '승인 시 원결제 수단으로 환불 처리됩니다.' : 'If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment.'}</li>
                </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
                    4. {isKr ? '반품 불가 품목' : 'Non-Returnable Items'}
                </h2>
                <p>
                    {isKr
                        ? '식품/음료 등 변질 우려가 있는 상품은 안전 및 위생상 파손/오배송이 아닌 경우 반품이 불가합니다. 맞춤 제작 상품도 반품이 불가합니다.'
                        : 'For safety and hygiene reasons, perishable goods (including food and beverages) are non-returnable unless they arrive damaged or incorrect. Custom or personalized items are also non-returnable.'}
                </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
                    5. {isKr ? '반품 배송' : 'Return Shipping'}
                </h2>
                <p>
                    {isKr
                        ? '반품 주소: 대구광역시 수성구 상녹로 11길 13, 1층'
                        : 'To return your product, you should mail your product to: 1F 13 Sangnok-ro 11-gil, Suseong-gu, Daegu, 42014, Republic of Korea.'}
                </p>
                <p>
                    {isKr
                        ? '반품 배송비는 고객 부담입니다.'
                        : 'You will be responsible for paying for your own shipping costs for returning your item.'}
                </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
                    6. {isKr ? '환불 처리 기간' : 'Refund Timing'}
                </h2>
                <p>
                    {isKr
                        ? '환불 승인 후 원결제 수단으로 처리됩니다. 처리 기간은 결제수단/은행에 따라 다를 수 있습니다.'
                        : 'Approved refunds are issued back to the original payment method. Timing depends on your bank or payment provider.'}
                </p>
            </section>

            <section>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
                    7. {isKr ? '문의' : 'Contact Us'}
                </h2>
                <p>
                    {isKr
                        ? '반품/환불 관련 문의는 verygoutchocolate@gmail.com 으로 연락주세요.'
                        : 'If you have any questions on how to return your item to us, contact us at verygoutchocolate@gmail.com.'}
                </p>
            </section>

            <p style={{ marginTop: '30px', fontSize: '12px', color: '#888' }}>
                {isKr ? '최종 수정일: 2026년 1월 31일' : 'Last updated: January 31, 2026'}
            </p>
        </div>
    );
};

export default RefundPolicy;
