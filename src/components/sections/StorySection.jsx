export default function StorySection() {
    return (
        <article className="section" id="story">
            <div className="section-head">
                <h2 className="section-title">STORY</h2>
                <p className="section-sub">Verygood, Creative Cacao.</p>
            </div>

            <div className="brand-story-grid">
                <div className="story-text-block">
                    <h3 className="story-heading">
                        What sentiment<br />would you like to<br />convey today?
                    </h3>
                    <p className="story-desc">
                        We discovered a way to preserve those sentiments in cacao. <br />
                        Love, Celebration, Support, Comfort, Gratitude. <br />
                        Life has moments where chocolate is essential. <br />
                        We don't just make chocolate; we craft moments.
                    </p>
                    <p className="story-slogan">Think Chocolate, Think Very Good!</p>
                </div>
                <div className="story-img-block">
                    <img src="/assets/story/story-hogirl.png" alt="Brand Story Image" />
                </div>
            </div>
        </article>
    );
}
