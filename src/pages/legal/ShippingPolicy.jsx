import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ShippingPolicy = () => {
    const { isKr } = useLanguage();

    return (
        <div className="legal-page-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 20px 60px', lineHeight: '1.6' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '30px', fontWeight: 'bold' }}>
                {isKr ? '배송 정책' : 'Shipping Policy'}
            </h1>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
                    1. {isKr ? '주문 처리' : 'Order Processing'}
                </h2>
                <p>
                    {isKr
                        ? '결제 완료 후 주문이 준비됩니다. 성수기, 출시, 프로모션 기간에는 처리 시간이 변동될 수 있습니다. 택배사 인수 후 운송장 정보를 안내드립니다.'
                        : 'Orders are prepared after payment confirmation. Processing times may vary during peak seasons, launches, or promotions. Tracking details are shared once the carrier accepts the parcel.'}
                </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
                    2. {isKr ? '배송 소요 기간' : 'Delivery Timeframes'}
                </h2>
                <p>
                    {isKr
                        ? '국내 배송은 보통 1~2일, 해외 배송은 7~10일이 소요됩니다. 배송 기간은 지역, 택배사 일정, 통관 절차에 따라 달라질 수 있습니다.'
                        : 'Domestic delivery typically takes 1–2 days. International delivery typically takes 7–10 days. Delivery timeframes vary by destination, carrier schedules, and customs clearance.'}
                </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
                    3. {isKr ? '배송 가능 지역' : 'Shipping Destinations'}
                </h2>
                <p>
                    {isKr
                        ? '대한민국에서 국내 및 국제 배송을 진행합니다. 배송이 불가한 지역은 결제 단계에서 안내됩니다.'
                        : 'We ship from the Republic of Korea to supported domestic and international destinations. If a destination is unavailable, it will be indicated at checkout.'}
                </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
                    4. {isKr ? '배송비' : 'Shipping Fees'}
                </h2>
                <p>
                    {isKr
                        ? '배송비는 결제 단계에서 자동으로 계산되어 표시됩니다. 프로모션이 있는 경우 웹사이트에 별도로 안내됩니다.'
                        : 'Shipping fees are calculated and displayed during checkout. Promotional shipping offers, if any, are shown on the website.'}
                </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
                    5. {isKr ? '관세 및 세금' : 'Customs, Duties, and Taxes'}
                </h2>
                <p>
                    {isKr
                        ? '해외 주문의 경우 수입 관세, 세금, 통관 수수료가 발생할 수 있으며, 해당 비용은 구매자 부담입니다.'
                        : 'International orders may be subject to customs duties, import taxes, or fees determined by local authorities. These charges are the customer’s responsibility.'}
                </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
                    6. {isKr ? '주소 정확성' : 'Address Accuracy'}
                </h2>
                <p>
                    {isKr
                        ? '정확한 배송 주소를 입력해 주세요. 잘못된 주소로 인한 배송 지연/분실에 대해 당사는 책임지지 않습니다.'
                        : 'Please double-check your shipping address before completing the order. We are not responsible for delays or loss caused by incorrect or incomplete addresses provided by the customer.'}
                </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
                    7. {isKr ? '배송 문제' : 'Delivery Issues'}
                </h2>
                <p>
                    {isKr
                        ? '배송 지연, 파손, 오배송이 발생한 경우 주문번호와 사진을 함께 보내주시면 신속히 도와드리겠습니다.'
                        : 'If your package is delayed, damaged, or missing, contact us with your order number and any relevant photos. We will work with the carrier to resolve the issue as quickly as possible.'}
                </p>
            </section>

            <section>
                <h2 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
                    8. {isKr ? '문의' : 'Contact Us'}
                </h2>
                <p>
                    {isKr
                        ? '배송 관련 문의는 verygoutchocolate@gmail.com 으로 연락주세요.'
                        : 'For shipping-related questions, contact us at verygoutchocolate@gmail.com.'}
                </p>
            </section>

            <p style={{ marginTop: '30px', fontSize: '12px', color: '#888' }}>
                {isKr ? '최종 수정일: 2026년 1월 31일' : 'Last updated: January 31, 2026'}
            </p>
        </div>
    );
};

export default ShippingPolicy;
