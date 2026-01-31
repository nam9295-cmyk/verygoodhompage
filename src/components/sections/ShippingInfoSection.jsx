const shippingItems = [
    {
        title: "Processing & Tracking",
        body: "Orders are prepared after payment confirmation. Tracking is shared once the carrier accepts the parcel."
    },
    {
        title: "Delivery Estimates",
        body: "Delivery times vary by destination, customs processing, and carrier schedules."
    },
    {
        title: "Customs & Duties",
        body: "International orders may incur import duties or taxes. These charges are the buyer's responsibility."
    },
    {
        title: "Issues in Transit",
        body: "If a package arrives damaged or incorrect, contact us with your order number and photos."
    }
];

export default function ShippingInfoSection() {
    return (
        <section className="section" id="shipping">
            <div className="section-head">
                <h2 className="section-title">SHIPPING GUIDE</h2>
                <p className="section-sub">International delivery notes and care guidance.</p>
            </div>
            <div className="shipping-grid">
                {shippingItems.map((item) => (
                    <div className="shipping-card" key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
