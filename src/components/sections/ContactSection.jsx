import { useLanguage } from '../../context/LanguageContext';

export default function ContactSection() {
    const { isKr } = useLanguage();

    return (
        <section className="section" id="contact">
            <div className="section-head">
                <h2 className="section-title">CONTACT</h2>
                <p className="section-sub">{isKr ? '방문하거나 메시지를 보내주세요.' : 'Visit us or send a message.'}</p>
            </div>

            <div className="contact-grid">
                <div className="inquiry-container">
                    <form className="inquiry-form" action="https://formspree.io/f/mwvveyoj" method="POST">
                        <div className="form-group">
                            <label htmlFor="name">{isKr ? '이름' : 'Name'}</label>
                            <input type="text" id="name" name="name" placeholder={isKr ? '성함을 입력해주세요' : 'Your Name'} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">{isKr ? '이메일' : 'E-mail'}</label>
                            <input type="email" id="email" name="email" placeholder={isKr ? '이메일 주소를 입력해주세요' : 'Your Email Address'} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">{isKr ? '메시지' : 'Message'}</label>
                            <textarea id="message" name="message" rows="5" placeholder={isKr ? '문의하실 내용을 입력해주세요' : 'How can we help you?'} required />
                        </div>
                        <button type="submit" className="cta form-submit">
                            {isKr ? '문의 보내기' : 'SEND MESSAGE'}
                        </button>
                    </form>
                </div>

                <div className="map-container">
                    <iframe
                        className="map-embed"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps?q=대구광역시%20수성구%20상록로11길%2013%201층&output=embed"
                        title="Store Location"
                    />
                    <div className="map-info">
                        <p className="map-address">대구광역시 수성구 상록로11길 13 1층</p>
                        <a
                            className="map-link-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.google.com/maps?q=대구광역시%20수성구%20상록로11길%2013%201층"
                        >
                            Google Maps ↗
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
