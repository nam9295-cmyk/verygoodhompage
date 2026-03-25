import { getSiteProfile } from './siteProfile';
import { externalLinks, projectIntegrations } from './projectIntegrations';

export function getPrimaryNavigation(isKr) {
    return [
        { label: 'Home', to: '/' },
        { label: isKr ? '브랜드' : 'Brand', to: '/brand' },
        { label: isKr ? '제품' : 'Products', to: '/products' },
        { label: isKr ? '매장' : 'Store', to: '/store' },
        { label: isKr ? '서비스' : 'Services', to: '/services' },
        { label: isKr ? '디지털' : 'Digital', to: '/digital' },
        { label: 'Blog', to: '/blog' },
        { label: isKr ? '문의' : 'Contact', to: '/contact' },
    ];
}

export function getFooterServiceLinks(isKr) {
    return [
        { label: isKr ? '리뷰 보기' : 'Reviews', href: externalLinks.reviews, external: true },
        { label: isKr ? '케이크 예약' : 'Cake Reservation', href: externalLinks.reservation, external: true },
        { label: isKr ? '웰니스 앱' : 'Wellness App', href: externalLinks.wellnessApp, fallbackTo: '/digital' },
        { label: isKr ? '관리자 대시보드' : 'Admin Dashboard', href: externalLinks.admin },
        { label: isKr ? 'AI 베타' : 'AI Beta', href: externalLinks.aiBeta, fallbackTo: '/digital' },
        { label: 'Instagram', href: externalLinks.instagram, external: true },
    ];
}

export function getHomeSections(isKr) {
    const profile = getSiteProfile(isKr);

    return {
        hero: {
            eyebrow: 'Less Sweet, More Deep',
            title: isKr
                ? '초콜릿과 티, 그리고 머무는 공간.'
                : 'A calm home for chocolate, tea, and store life.',
            description: isKr
                ? '베리굿이 제안하는 맛과 쉼, 그 여정을 한곳에서 시작하세요.'
                : 'An editorial entry for browsing products, planning a visit, and exploring our stories.',
            ctas: [
                { label: isKr ? '둘러보기' : 'Explore', to: '/products' },
                { label: isKr ? '방문하기' : 'Visit', to: '/store' },
                { label: isKr ? '알아보기' : 'Learn More', to: '/digital' },
            ],
            note: isKr
                ? '초콜릿과 티, 매장과 디지털 프로젝트를 하나의 흐름으로 이어 보여줍니다.'
                : 'Chocolate, tea, store life, and digital projects are now read in one connected flow.',
        },
        overviewCards: [
            {
                title: isKr ? 'Chocolate' : 'Chocolate',
                body: isKr ? '빈투바 시그니처 초콜릿과 시즌 에디션.' : 'Signature chocolates and seasonal releases.',
                to: '/products',
                assetKey: 'products',
                ctaLabel: isKr ? '둘러보기' : 'Explore',
            },
            {
                title: isKr ? 'Blending Tea' : 'Blending Tea',
                body: isKr ? '일상의 휴식과 웰니스에 닿는 라인업.' : 'A blending tea line for everyday rituals and wellness.',
                to: '/products',
                assetKey: 'products',
                ctaLabel: isKr ? '둘러보기' : 'Explore',
            },
            {
                title: isKr ? 'Offline Store' : 'Offline Store',
                body: isKr ? '대구 수성구. 고요하고 따뜻한 공간에서의 안내.' : 'A calm store layer for your visit planning.',
                to: '/store',
                assetKey: 'store',
                ctaLabel: isKr ? '방문하기' : 'Visit',
            },
            {
                title: isKr ? 'Digital Experience' : 'Digital Experience',
                body: isKr ? '베리굿의 가치를 이어가는 앱과 스몰 프로젝트.' : 'A quiet introduction to our app and beta experiments.',
                to: '/digital',
                assetKey: 'digital',
                ctaLabel: isKr ? '알아보기' : 'Learn More',
            },
        ],
        serviceCards: [
            {
                title: isKr ? 'Cake Reservation' : 'Cake Reservation',
                body: isKr ? projectIntegrations.reservation.cardBody.ko : projectIntegrations.reservation.cardBody.en,
                href: externalLinks.reservation,
                external: true,
                assetKey: 'reservation',
                ctaLabel: isKr ? '방문하기' : 'Visit',
            },
            {
                title: isKr ? 'Reviews' : 'Reviews',
                body: isKr ? projectIntegrations.reviewEvent.cardBody.ko : projectIntegrations.reviewEvent.cardBody.en,
                href: externalLinks.reviews,
                external: true,
                assetKey: 'reviewEvent',
                ctaLabel: isKr ? '읽어보기' : 'Read More',
            },
            {
                title: isKr ? 'Order & Gift Guide' : 'Order & Gift Guide',
                body: isKr ? '소중한 분을 위한 선물과 정성스러운 주문 안내.' : 'Gift sets and ordering process details.',
                to: '/products',
                assetKey: 'products',
                ctaLabel: isKr ? '둘러보기' : 'Explore',
            },
        ],
        digitalCards: [
            {
                title: isKr ? 'Wellness App' : 'Wellness App',
                body: isKr ? projectIntegrations.wellnessApp.cardBody.ko : projectIntegrations.wellnessApp.cardBody.en,
                href: null,
                fallbackTo: '/digital',
                assetKey: 'wellnessApp',
                ctaLabel: isKr ? '자세히' : 'Learn More',
            },
            {
                title: isKr ? 'Admin Dashboard' : 'Admin Dashboard',
                body: isKr ? projectIntegrations.wellnessAdmin.cardBody.ko : projectIntegrations.wellnessAdmin.cardBody.en,
                href: null,
                fallbackTo: '/digital',
                assetKey: 'wellnessAdmin',
                ctaLabel: isKr ? '자세히' : 'Learn More',
            },
            {
                title: isKr ? 'AI Recommendation Beta' : 'AI Recommendation Beta',
                body: isKr ? '더 깊은 취향을 제안하기 위한 베리굿의 작은 실험.' : 'A small experiment for deeper personal recommendations.',
                href: externalLinks.aiBeta,
                fallbackTo: '/digital',
                assetKey: 'digital',
                ctaLabel: isKr ? '미리보기' : 'Preview',
            },
        ],
        contactLines: [
            profile.addressShort,
            profile.hours,
            profile.email,
        ],
    };
}

export function getSectionPageContent(isKr) {
    const profile = getSiteProfile(isKr);

    return {
        brand: {
            eyebrow: isKr ? 'BRAND' : 'BRAND',
            title: isKr ? '우리의 이야기. 오랫동안 다듬어 온 맛과 분위기.' : 'The page where Very Good’s taste, scenes, and voice come together.',
            description: isKr
                ? '초콜릿부터 티, 그리고 머무는 공간까지. 베리굿의 시간이 묻어나는 결을 소개합니다.'
                : 'A calmer introduction to our tone, chocolate, tea, and seasonal notes.',
            image: '/assets/story/story-1.png',
            imageAlt: isKr ? '베리굿 브랜드 스토리 이미지' : 'Very Good brand story image',
            facts: [
                { label: isKr ? 'Tagline' : 'Tagline', value: 'Less Sweet, More Deep' },
                { label: isKr ? 'Base' : 'Base', value: isKr ? '대구 수성구' : 'Daegu, Korea' },
                { label: isKr ? 'Focus' : 'Focus', value: isKr ? 'Chocolate + Tea + Store + Digital' : 'Chocolate + Tea + Store + Digital' },
            ],
            highlights: [
                isKr ? 'Less Sweet, More Deep라는 철학' : 'A clear Less Sweet, More Deep philosophy',
                isKr ? 'Bean-to-bar와 블렌딩 제품의 공존' : 'Bean-to-bar chocolate alongside blended tea',
                isKr ? '오프라인 경험과 디지털 실험을 함께 다루는 구조' : 'A structure that holds store experience and digital experiments together',
            ],
            modules: [
                {
                    title: isKr ? '브랜드 언어' : 'Brand language',
                    body: isKr
                        ? '짧은 문장과 메뉴, 섹션의 말투를 브랜드 톤에 맞게 정리합니다.'
                        : 'Shape the one-line copy, menu labels, and section text around the tone of the brand.',
                },
                {
                    title: isKr ? '스토리 자산 연결' : 'Story asset bridge',
                    body: isKr
                        ? '기존 소개와 스토리 자산을 자연스럽게 이어 브랜드 이야기가 끊기지 않게 합니다.'
                        : 'Keep the flow between About and Business Story so the narrative feels continuous.',
                },
                {
                    title: isKr ? '브랜드의 흐름' : 'Longer-term direction',
                    body: isKr
                        ? '브랜드, 매장, 블로그, 디지털을 같은 분위기 안에서 읽게 하는 중심 페이지입니다.'
                        : 'This page sets the tone that can carry the store, blog, and digital layers together.',
                },
            ],
            featureCards: [
                {
                    title: isKr ? '철학 중심' : 'Philosophy-led',
                    body: isKr ? '제품보다 먼저 브랜드의 문장과 태도를 느낄 수 있게 구성했습니다.' : 'A structure where visitors read the brand voice before the product grid.',
                    eyebrow: isKr ? 'Tone' : 'Tone',
                },
                {
                    title: isKr ? '스토리 보존' : 'Story retained',
                    body: isKr ? '기존 이야기 자산이 끊기지 않고 부드럽게 이어지도록 정리했습니다.' : 'Keep the existing story assets connected so the narrative feels seamless.',
                    eyebrow: isKr ? 'Archive' : 'Archive',
                },
                {
                    title: isKr ? '통합 기준점' : 'Integration baseline',
                    body: isKr ? 'Store, Blog, Digital로 이어지는 전체 분위기의 기준을 여기서 잡습니다.' : 'This page sets the tone that Store, Blog, and Digital can follow next.',
                    eyebrow: isKr ? 'System' : 'System',
                },
            ],
            featuredProductIds: ['almond-chocoball', 'british-black', 'gift-4-set'],
            detailCards: [
                {
                    label: isKr ? 'Philosophy' : 'Philosophy',
                    title: 'Less Sweet, More Deep',
                    body: isKr ? '베리굿의 핵심 문장은 단순한 슬로건보다, 제품과 공간, 콘텐츠를 묶는 기준에 가깝습니다.' : 'The core line is more than a slogan. It is the framing principle across products, space, content, and digital introductions.',
                },
                {
                    label: isKr ? 'Craft' : 'Craft',
                    title: isKr ? '초콜릿과 티를 함께 다루는 브랜드' : 'Chocolate and tea in one brand system',
                    body: isKr ? 'Bean-to-bar 초콜릿과 블렌딩 티를 함께 다루기 때문에, 단순한 카테고리보다 브랜드의 결이 더 중요합니다.' : 'Because bean-to-bar chocolate and blended tea live inside one brand sentence, context matters more than simple category listing.',
                },
                {
                    label: isKr ? 'Store Layer' : 'Store Layer',
                    title: isKr ? '오프라인 경험까지 포함한 브랜드' : 'A brand that includes offline experience',
                    body: isKr ? '베리굿은 제품 소개에 머무르지 않고, 매장 경험과 방문의 장면까지 함께 보여주는 브랜드입니다.' : 'Very Good should not remain a product-only site. It needs to communicate the store experience and visit flow as part of the brand.',
                },
                {
                    label: isKr ? 'Future' : 'Future',
                    title: isKr ? '디지털 실험까지 품는 브랜드' : 'A brand that can hold digital experiments',
                    body: isKr ? '웰니스 앱과 관리자 도구, AI 베타 역시 브랜드와 어긋나지 않는 톤 안에서 소개합니다.' : 'The wellness app, admin tools, and AI beta are introduced in a tone that still feels aligned with the brand.',
                },
            ],
            galleryCards: [
                {
                    title: isKr ? 'Philosophy First' : 'Philosophy First',
                    body: isKr ? '브랜드 문장과 태도가 먼저 읽히는 구성이 이 페이지의 중심입니다.' : 'This page works best when the brand voice and attitude are read first.',
                },
                {
                    title: isKr ? 'Character & Detail' : 'Character & Detail',
                    body: isKr ? '캐릭터, 패키지, 디테일은 브랜드 톤을 부드럽게 만들고 기억 지점을 만들어 줍니다.' : 'Characters, packaging, and detail cues soften the tone and create memorable brand anchors.',
                },
                {
                    title: isKr ? 'Origin & Story' : 'Origin & Story',
                    body: isKr ? '원산지와 제작 스토리는 제품 정보와 분리되지 않고 브랜드 레이어 안에서 함께 읽히는 편이 좋습니다.' : 'Origin and making-story cues work best when they sit inside the brand layer instead of apart from it.',
                },
            ],
            faqItems: [
                {
                    q: isKr ? '왜 /about 과 /business-story 를 바로 없애지 않았나요?' : 'Why not remove /about and /business-story immediately?',
                    a: isKr ? '브랜드 이야기는 한 번에 옮기기보다, 읽는 흐름이 자연스럽게 이어지도록 천천히 다듬는 편이 더 좋기 때문입니다.' : 'Because the brand story reads better when it evolves naturally instead of moving all at once.',
                },
                {
                    q: isKr ? 'Brand 페이지는 결국 어떤 역할이 되나요?' : 'What should Brand become eventually?',
                    a: isKr ? 'Brand는 소개와 스토리를 한곳에 모으는 중심 페이지가 됩니다.' : 'Brand becomes the central page for the introduction and story of Very Good.',
                },
                {
                    q: isKr ? '브랜드 페이지가 제품 페이지와 다른 점은 무엇인가요?' : 'How is Brand different from Products?',
                    a: isKr ? 'Products는 카탈로그와 선택 동선, Brand는 철학과 방향성과 문맥을 담당합니다. 둘의 역할을 분리해야 상단 IA가 더 선명해집니다.' : 'Products handles catalog and selection flow, while Brand carries philosophy, direction, and context. Keeping them separate clarifies the IA.',
                },
            ],
            links: [
                { label: isKr ? '소개 페이지' : 'About page', to: '/about' },
                { label: isKr ? '비즈니스 스토리' : 'Business story', to: '/business-story' },
            ],
            notes: [
                isKr ? '기존 브랜드 스토리 페이지는 삭제하지 않고 허브 하위 레이어로 유지합니다.' : 'Existing story pages stay in place as supporting layers under the hub.',
                isKr ? '브랜드 카피와 비주얼 톤은 이후 Store, Blog, Digital에도 동일 기준으로 확장합니다.' : 'This tone system can be extended consistently into Store, Blog, and Digital next.',
            ],
        },
        store: {
            eyebrow: isKr ? 'STORE' : 'STORE',
            title: isKr ? '베리굿 매장을 찾기 전, 먼저 읽어두면 좋은 안내입니다.' : 'A page for visiting the Very Good store and reading its atmosphere.',
            description: isKr
                ? '위치와 운영시간, 지도와 후기, 예약 흐름을 한곳에서 차분하게 살필 수 있습니다.'
                : 'Location, hours, map, reviews, and reservation cues are gathered in one place.',
            image: '/assets/story/main.webp',
            imageAlt: isKr ? '베리굿 오프라인 스토어' : 'Very Good offline store',
            facts: [
                { label: isKr ? 'Location' : 'Location', value: profile.addressShort },
                { label: isKr ? 'Hours' : 'Hours', value: '11:00 - 19:00' },
                { label: isKr ? 'Role' : 'Role', value: isKr ? '제품 경험 + 방문 안내' : 'Products + visit guidance' },
            ],
            highlights: [
                isKr ? '위치, 운영시간, 방문 전 체크 포인트' : 'Location, hours, and visit essentials',
                isKr ? '매장 중심 제품과 시즌 디스플레이 소개' : 'Store-led products and seasonal displays',
                isKr ? '오프라인 후기와 케이크 예약으로 이어지는 행동 유도' : 'Action paths to reviews and cake reservations',
            ],
            modules: [
                {
                    title: isKr ? 'Visit Info' : 'Visit Info',
                    body: isKr
                        ? '위치, 지도, 문의 흐름을 한곳에서 읽기 쉽게 정리합니다.'
                        : 'Bring location, map, and contact cues together in one easy view.',
                },
                {
                    title: isKr ? 'Store Products' : 'Store Products',
                    body: isKr
                        ? '대표 제품과 메뉴를 매장 경험의 맥락 안에서 읽게 하고, 필요하면 제품 상세로 이어줍니다.'
                        : 'Keep signature products and menu cues inside the visit flow, then bridge into product detail when needed.',
                },
                {
                    title: isKr ? 'Review & Reservation' : 'Review & Reservation',
                    body: isKr
                        ? '후기 확인과 케이크 예약을 방문 흐름 안에서 자연스럽게 이어줍니다.'
                        : 'Place reviews and cake reservations naturally inside the visit flow.',
                },
            ],
            featureCards: [
                {
                    title: isKr ? '방문 전 체크' : 'Before you visit',
                    body: isKr ? '주소, 운영시간, 매장 분위기, 픽업 동선을 한 화면에서 훑을 수 있게 만듭니다.' : 'Let visitors scan the address, hours, atmosphere, and pickup flow in one screen.',
                    eyebrow: isKr ? 'Visit' : 'Visit',
                },
                {
                    title: isKr ? '매장 제품 연결' : 'Store-led products',
                    body: isKr ? '매장에서 많이 보여주는 초콜릿, 티, 선물세트를 제품 상세와 자연스럽게 연결합니다.' : 'Connect store-led chocolates, tea, and gift sets back into the product detail pages.',
                    eyebrow: isKr ? 'Shelf' : 'Shelf',
                },
                {
                    title: isKr ? '후기와 예약' : 'Reviews and reservations',
                    body: isKr ? '후기를 살펴본 뒤 바로 예약으로 이어질 수 있게 정리합니다.' : 'Create a clear path from reviews into reservation actions.',
                    eyebrow: isKr ? 'Action' : 'Action',
                },
            ],
            featuredProductIds: ['almond-chocoball', 'british-black', 'gift-2-set'],
            links: [
                { label: isKr ? '지도 보기' : 'Open map', href: externalLinks.storeMap, external: true },
                { label: isKr ? '리뷰 보기' : 'See reviews', href: externalLinks.reviews, external: true },
                { label: isKr ? '케이크 예약' : 'Cake reservation', href: externalLinks.reservation, external: true },
                { label: isKr ? '제품 둘러보기' : 'Explore', to: '/products' },
            ],
            detailCards: [
                {
                    label: isKr ? 'Address' : 'Address',
                    title: profile.addressFull,
                    body: isKr ? '방문 전에 가장 먼저 확인해야 할 기본 주소입니다. 지도와 함께 바로 살펴볼 수 있도록 두었습니다.' : 'This is the base visit address, now tied to the map asset already used in the VCC project.',
                },
                {
                    label: isKr ? 'Hours' : 'Hours',
                    title: 'Mon-Sat 11:00 - 19:00',
                    body: isKr ? '운영시간과 시즌별 변동 안내를 가장 먼저 확인할 수 있는 자리입니다.' : 'This card is meant to hold opening hours first, plus any seasonal schedule changes later.',
                },
                {
                    label: isKr ? 'Pickup' : 'Pickup',
                    title: isKr ? '예약/픽업 동선 분리' : 'Reservation and pickup path',
                    body: isKr ? '케이크 예약은 Services에서, 픽업과 현장 안내는 Store에서 살펴볼 수 있게 나눴습니다.' : 'Cake reservation can stay in Services, while Store handles the on-site pickup guidance.',
                },
                {
                    label: isKr ? 'Best For' : 'Best For',
                    title: isKr ? '첫 방문, 선물 구매, 후기 확인' : 'First visits, gifting, review checks',
                    body: isKr ? '초콜릿과 티, 위치와 지도, 후기 링크를 한 번에 살펴볼 수 있는 방문 페이지입니다.' : 'A visit page that connects chocolate, tea, map, and review links in one place.',
                },
            ],
            galleryCards: [
                {
                    title: isKr ? 'Store Atmosphere' : 'Store Atmosphere',
                    body: isKr ? '매장의 톤과 브랜드 분위기를 먼저 보여주는 대표 컷입니다.' : 'A lead visual that sets the tone of the store and brand atmosphere.',
                },
                {
                    title: isKr ? 'Map & Access' : 'Map & Access',
                    body: isKr ? '지도 자산을 활용해 방문 동선을 바로 확인할 수 있게 했습니다.' : 'Use the map asset so visitors can understand access at a glance.',
                },
                {
                    title: isKr ? 'Store Identity' : 'Store Identity',
                    body: isKr ? '로고와 브랜드 디테일을 함께 보여줘 매장 레이어가 더 실제감 있게 느껴집니다.' : 'Logo and identity details help the store layer feel more grounded and real.',
                },
            ],
            faqItems: [
                {
                    q: isKr ? '처음 방문하는 사람은 어디부터 보면 되나요?' : 'Where should a first-time visitor start?',
                    a: isKr ? '대표 초콜릿, 블렌딩 티, 선물세트를 먼저 보고 필요하면 리뷰와 예약 링크로 넘어가는 흐름이 가장 자연스럽습니다.' : 'Start with signature chocolates, blended tea, and gift sets, then move into reviews or reservation if needed.',
                },
                {
                    q: isKr ? '예약과 매장 방문 정보는 왜 나뉘어 있나요?' : 'Why split reservation and store guidance?',
                    a: isKr ? '예약은 바로 행동으로 이어지는 서비스이고, 이 페이지는 방문과 매장 경험 안내에 더 집중하기 때문입니다.' : 'Because reservation is an action-first service, while this page focuses on visiting and the in-store experience.',
                },
                {
                    q: isKr ? '향후 kr 사이트 정보는 여기로 옮길 수 있나요?' : 'Can the Korean site content move here later?',
                    a: isKr ? '네. 매장 정보와 현장 제품 설명을 이 페이지에 점점 더 자연스럽게 모을 수 있습니다.' : 'Yes. Store information and in-person product guidance can gradually gather here over time.',
                },
            ],
            notes: [
                isKr ? 'vcc체험단페이지의 위치/지도/브랜드 자산은 장기적으로 이 페이지로 흡수하면 됩니다.' : 'The location, map, and identity assets from the VCC project can be absorbed here over time.',
            ],
        },
        services: {
            eyebrow: isKr ? 'SERVICES' : 'SERVICES',
            title: isKr ? '예약과 리뷰, 선물 흐름을 한눈에 정리했습니다.' : 'A service page for reservations, reviews, and gifting.',
            description: isKr
                ? '필요한 행동만 간결하게 정리해 실제 운영 페이지로 자연스럽게 이어줍니다.'
                : 'A short, clear layer that leads naturally into the live service pages.',
            image: '/assets/products/4set.png',
            imageAlt: isKr ? '베리굿 서비스와 선물 안내' : 'Very Good services and gifting',
            facts: [
                { label: isKr ? 'Reservation' : 'Reservation', value: isKr ? 'partner.verygood-chocolate.com 운영 중' : 'Live on partner.verygood-chocolate.com' },
                { label: isKr ? 'Reviews' : 'Reviews', value: isKr ? 'reciept.verygood-chocolate.com 운영 중' : 'Live on reciept.verygood-chocolate.com' },
                { label: isKr ? 'Commerce' : 'Commerce', value: isKr ? '기존 카트/체크아웃 유지' : 'Current cart/checkout retained' },
            ],
            highlights: [
                isKr ? '오프라인 리뷰 진입' : 'Offline review entry',
                isKr ? '케이크 예약 진입' : 'Cake reservation entry',
                isKr ? '주문 및 선물 가이드' : 'Order and gifting guidance',
            ],
            modules: [
                {
                    title: isKr ? 'Cake Reservation' : 'Cake Reservation',
                    body: isKr
                        ? '예약은 별도 페이지에서 운영하고, 여기서는 가장 빠른 진입만 보여줍니다.'
                        : 'Reservation stays on its own page, while this page simply provides the clearest entry.',
                },
                {
                    title: isKr ? 'Reviews' : 'Reviews',
                    body: isKr
                        ? '리뷰 이벤트 페이지는 방문 전 분위기와 신뢰를 더하는 보조 레이어로 둡니다.'
                        : 'The review event page remains a supporting trust layer before a visit or reservation.',
                },
                {
                    title: isKr ? 'Order / Gift Guide' : 'Order / Gift Guide',
                    body: isKr
                        ? '제품, 장바구니, 체크아웃 흐름은 그대로 두고 선택의 흐름만 정리합니다.'
                        : 'The product, cart, and checkout flow stays as-is while the hub sharpens the decision path.',
                },
            ],
            featureCards: [
                {
                    title: isKr ? 'Reservation' : 'Reservation',
                    body: isKr ? '실제 예약 URL로 바로 연결되는 가장 강한 서비스 CTA로 유지합니다.' : 'Keep reservation as the strongest service CTA, linked directly to its live URL.',
                    eyebrow: isKr ? 'External flow' : 'External flow',
                },
                {
                    title: isKr ? 'Review trust' : 'Review trust',
                    body: isKr ? '실제 후기 링크는 Store와 Services 둘 다에서 만날 수 있게 유지합니다.' : 'Keep review links visible from both the Store and Services layers.',
                    eyebrow: isKr ? 'Trust' : 'Trust',
                },
                {
                    title: isKr ? 'Gift route' : 'Gift route',
                    body: isKr ? '선물세트와 장바구니 진입을 같은 흐름 안에서 이해하도록 구성합니다.' : 'Clarify the route from gift sets into cart and checkout in one narrative flow.',
                    eyebrow: isKr ? 'Commerce' : 'Commerce',
                },
            ],
            featuredProductIds: ['gift-4-set', 'gift-2-set', 'almond-chocoball'],
            links: [
                { label: isKr ? '리뷰 읽기' : 'Read More', href: externalLinks.reviews, external: true },
                { label: isKr ? '예약하기' : 'Visit', href: externalLinks.reservation, external: true },
                { label: isKr ? '제품 둘러보기' : 'Explore', to: '/products' },
            ],
            detailCards: [
                {
                    label: isKr ? 'Reservation' : 'Reservation',
                    title: isKr ? '실제 예약 페이지로 바로 연결' : 'Straight to the live reservation page',
                    body: isKr ? 'partner.verygood-chocolate.com에서 예약이 운영 중이므로, 이 페이지는 안내와 연결에 집중합니다.' : 'Because reservation already runs on partner.verygood-chocolate.com, this page can stay focused on guidance and entry.',
                },
                {
                    label: isKr ? 'Reviews' : 'Reviews',
                    title: isKr ? '리뷰 이벤트 페이지 연결' : 'Review event page connected',
                    body: isKr ? 'reciept.verygood-chocolate.com을 Store와 Services 양쪽에서 열 수 있게 두어 방문 전 신뢰를 더합니다.' : 'Keeping reciept.verygood-chocolate.com visible from both Store and Services helps establish trust early.',
                },
                {
                    label: isKr ? 'Gift Flow' : 'Gift Flow',
                    title: isKr ? '선물세트에서 결제까지 연결' : 'From gift set to checkout',
                    body: isKr ? '상품, 장바구니, 결제 흐름은 그대로 두고 이 페이지에서 선택 동선만 정리합니다.' : 'The product, cart, and checkout flow stays as it is, while this page clarifies the decision path around it.',
                },
                {
                    label: isKr ? 'Scope' : 'Scope',
                    title: isKr ? '복잡하지 않게, 바로 연결되도록' : 'Connection structure before replacement',
                    body: isKr ? '여러 서비스를 한 화면에서 이해하기 쉽게 정리해, 필요한 곳으로 바로 이어지게 했습니다.' : 'Right now the priority is making the service layer easier to understand at a glance.',
                },
            ],
            galleryCards: [
                {
                    title: isKr ? 'Reservation Entry' : 'Reservation Entry',
                    body: isKr ? '예약은 별도 서비스지만, 여기서는 깔끔한 행동 카드처럼 보여야 합니다.' : 'Reservation remains external, but here it should still read like a clear action card.',
                },
                {
                    title: isKr ? 'Gift Route' : 'Gift Route',
                    body: isKr ? '선물세트와 시즌 제품은 서비스 관점에서도 중요한 진입점이 됩니다.' : 'Gift sets and seasonal products are important service-facing entry points as well.',
                },
                {
                    title: isKr ? 'Review Layer' : 'Review Layer',
                    body: isKr ? '제품과 매장에 대한 신뢰를 쌓아주는 보조 레이어로 리뷰 링크를 유지합니다.' : 'The review link stays as a supporting layer that builds confidence around both products and the store.',
                },
            ],
            faqItems: [
                {
                    q: isKr ? '왜 예약을 사이트 안에 바로 합치지 않았나요?' : 'Why not merge reservation directly into the site yet?',
                    a: isKr ? '지금은 예약 도구를 바꾸기보다, 어디서 어떻게 들어가면 좋은지를 더 분명하게 보여주는 편이 자연스럽기 때문입니다.' : 'Because right now it is more useful to make the entry feel clear than to replace the reservation tool itself.',
                },
                {
                    q: isKr ? '리뷰 링크는 어디서 보이게 되나요?' : 'Where will the review link appear?',
                    a: isKr ? 'Store와 Services 두 곳 모두에서 보이게 유지해, 방문 전 신뢰 형성과 예약 전 확인 흐름을 모두 지원합니다.' : 'It remains visible from both Store and Services so it supports both visit planning and reservation confidence.',
                },
                {
                    q: isKr ? '기존 장바구니와 결제 흐름은 바뀌나요?' : 'Will the current cart and checkout flow change?',
                    a: isKr ? '지금은 바뀌지 않습니다. 현재의 주문 흐름은 그대로 두고, 이 페이지에서 선택과 진입만 더 쉽게 정리합니다.' : 'Not right now. The current order flow stays as it is, while this page simply makes selection and entry easier.',
                },
            ],
            notes: [
                isKr ? '현재 단계에서는 외부 서비스의 기능 자체를 건드리지 않고 연결 구조만 정리합니다.' : 'At this stage, only the connection structure changes; the external services themselves stay untouched.',
            ],
        },
        digital: {
            eyebrow: isKr ? 'DIGITAL' : 'DIGITAL',
            title: isKr ? '웰니스 앱과 운영 도구, 작은 실험들을 한곳에서 소개합니다.' : 'A page introducing the wellness app, operations tools, and beta experiments.',
            description: isKr
                ? '웰니스 앱과 어드민의 실제 화면, 핵심 흐름, 준비 중인 실험까지 차분하게 살펴볼 수 있습니다.'
                : 'A quieter introduction to the digital layer, with context before action.',
            image: '/assets/ceative-cacao/creative_intro.webp',
            imageAlt: isKr ? '베리굿 디지털 경험' : 'Very Good digital experience',
            facts: [
                { label: isKr ? 'App' : 'App', value: isKr ? '기록 · 추천 · 커스텀 블렌딩' : 'Logging · recommendations · custom blending' },
                { label: isKr ? 'Admin' : 'Admin', value: isKr ? '대시보드 · 멤버 관리 · 상세 리포트' : 'Dashboard · member management · deep reports' },
                { label: isKr ? 'AI Beta' : 'AI Beta', value: isKr ? '준비 중인 실험 레이어' : 'Still a small experiment' },
            ],
            highlights: [
                isKr ? '기록에서 추천과 블렌딩으로 이어지는 웰니스 앱' : 'A wellness app connecting logs, recommendations, and blending',
                isKr ? '회원 상태와 운영 흐름을 읽는 어드민 대시보드' : 'An admin dashboard for members and operations',
                isKr ? '지금은 작게 소개하는 AI 추천 실험' : 'A still-small AI recommendation experiment',
            ],
            modules: [
                {
                    title: isKr ? 'Wellness App' : 'Wellness App',
                    body: isKr
                        ? '하루의 기록이 추천과 커스텀 블렌딩으로 이어지는 웰니스 앱입니다.'
                        : 'The app already has a clear logging-and-recommendation flow, but for now it is introduced through explanation rather than a direct app link.',
                },
                {
                    title: isKr ? 'Admin Dashboard' : 'Admin Dashboard',
                    body: isKr
                        ? '넓은 화면에서 멤버 현황과 기록, 운영 인사이트를 다루는 내부 도구입니다.'
                        : 'The admin dashboard is presented as a separate internal operations layer, not a consumer product.',
                },
                {
                    title: isKr ? 'AI Recommendation Beta' : 'AI Recommendation Beta',
                    body: isKr
                        ? 'AI는 전면 기능보다, 추천 경험을 다듬는 작은 실험으로만 소개합니다.'
                        : 'AI stays framed as an experimental recommendation layer, not a headline promise.',
                },
            ],
            storySections: [
                {
                    eyebrow: isKr ? 'WELLNESS APP' : 'WELLNESS APP',
                    title: isKr ? '나의 하루를 읽는 퍼스널 웰니스 파트너' : 'A personal wellness partner that reads your day',
                    body: isKr ? '단순히 기록하는 앱이 아니라, 몸과 마음의 상태를 읽고 지금 필요한 한 잔의 차를 제안하는 흐름으로 설계했습니다.' : 'More than a logging tool, it reads your condition and suggests the tea that fits the moment.',
                    bullets: isKr
                        ? [
                            '일상의 기록이 맞춤형 티 제안으로 이어집니다.',
                            '시그니처 블렌딩과 AI 추천을 함께 보여줍니다.',
                            '차분한 인터페이스로 가볍게 시작할 수 있습니다.',
                        ]
                        : [
                            'Daily logs lead into tailored tea suggestions.',
                            'Signature blends and AI recommendations sit side by side.',
                            'A calm interface keeps the routine light.',
                        ],
                },
                {
                    eyebrow: isKr ? 'SIMPLE ROUTINE' : 'SIMPLE ROUTINE',
                    title: isKr ? '기록은 가볍게, 변화는 분명하게' : 'Light logging, clearer change',
                    body: isKr ? '수면과 기분, 활동량을 짧게 남기면 오늘의 컨디션을 읽고 그에 맞는 블렌딩을 제안하는 구조입니다.' : 'Sleep, mood, and activity come together in a short routine that leads into a more fitting blend.',
                    bullets: isKr
                        ? [
                            '터치 몇 번으로 수면, 기분, 활동량을 남깁니다.',
                            '기록된 데이터를 바탕으로 오늘의 추천을 제안합니다.',
                            '추천을 바탕으로 취향에 맞게 다시 다듬을 수 있습니다.',
                        ]
                        : [
                            'Track sleep, mood, and activity in just a few taps.',
                            'The system suggests a blend from what you logged today.',
                            'You can refine the recommendation to fit your taste.',
                        ],
                },
                {
                    eyebrow: isKr ? 'TEA LAB EXPERIENCE' : 'TEA LAB EXPERIENCE',
                    title: isKr ? '손끝에서 완성되는 커스텀 블렌딩' : 'Custom blending shaped by your fingertips',
                    body: isKr ? '커스텀 블렌딩 화면은 단순한 설정이 아니라, 비율과 색감, 향의 균형을 함께 느끼는 티 랩 경험으로 설계했습니다.' : 'The custom blend screen is designed less like settings and more like a tea lab for balance, color, and mood.',
                    bullets: isKr
                        ? [
                            '재료 비율에 따라 티팟 비주얼이 실시간으로 반응합니다.',
                            '맛과 향의 밸런스를 직관적으로 조절할 수 있습니다.',
                            '프리미엄 티를 직접 만드는 감각적인 경험을 담았습니다.',
                        ]
                        : [
                            'The teapot visual responds in real time to ingredient ratios.',
                            'Taste and aroma balance can be adjusted intuitively.',
                            'It aims to feel like crafting a premium tea of your own.',
                        ],
                },
                {
                    eyebrow: isKr ? 'ADMIN DASHBOARD' : 'ADMIN DASHBOARD',
                    title: isKr ? '운영과 멤버 흐름을 넓은 화면에서 읽습니다' : 'Operations and member flow on a wider screen',
                    body: isKr ? '웰니스 앱의 운영 레이어는 모바일의 한계를 넘어, 대시보드와 멤버 관리, 그룹별 흐름을 한눈에 볼 수 있도록 설계했습니다.' : 'The admin layer expands beyond the limits of mobile, bringing dashboards, member management, and group flow into one wide view.',
                    bullets: isKr
                        ? [
                            '실시간 통합 통계를 한 화면에서 확인합니다.',
                            '조직과 그룹별로 멤버를 검색하고 관리할 수 있습니다.',
                            '운영 흐름과 권한, 설정을 분리해 다룹니다.',
                        ]
                        : [
                            'Integrated stats are visible in one dashboard.',
                            'Members can be filtered by organization and group.',
                            'Operations, permissions, and settings stay clearly separated.',
                        ],
                },
                {
                    eyebrow: isKr ? 'DEEP INSIGHT' : 'DEEP INSIGHT',
                    title: isKr ? '한 명의 사용자에게 집중하는 상세 리포트' : 'Deep reports focused on a single member',
                    body: isKr ? '수면과 기분, 피로도, 블렌드 사용 기록을 함께 읽으며 한 명의 변화를 더 깊게 살펴볼 수 있는 구조입니다.' : 'Sleep, mood, fatigue, and blend history come together in a closer member-level report.',
                    bullets: isKr
                        ? [
                            '기록 분석과 블렌드 로그를 나란히 읽습니다.',
                            '운영 메모와 그룹 이동, 내보내기까지 이어집니다.',
                            '개별 사용자에 맞춘 인사이트를 빠르게 확인할 수 있습니다.',
                        ]
                        : [
                            'Log analysis and blend history are read side by side.',
                            'Operational notes, group moves, and exports stay close at hand.',
                            'Member-specific insight is easier to read at a glance.',
                        ],
                },
            ],
            featureCards: [
                {
                    title: isKr ? '앱 소개의 밀도' : 'App story depth',
                    body: isKr ? '웰니스 앱은 기록, 추천, 커스텀 블렌딩까지 하나의 서사로 읽히는 편이 더 설득력 있습니다.' : 'The wellness app reads best when logging, recommendation, and custom blending form one continuous story.',
                    eyebrow: isKr ? 'App' : 'App',
                },
                {
                    title: isKr ? '운영 도구의 선명함' : 'Clear admin role',
                    body: isKr ? '어드민은 고객용 서비스와 분리하되, 실제 운영 화면과 멤버 관리 흐름을 충분히 보여주는 편이 좋습니다.' : 'The admin layer should stay separate from customer-facing pages, while still showing enough of the real operations flow.',
                    eyebrow: isKr ? 'Admin' : 'Admin',
                },
                {
                    title: isKr ? 'AI 베타 톤' : 'AI beta tone',
                    body: isKr ? 'AI는 과장된 메인 기능보다, 준비 중인 추천 실험처럼 보이도록 작은 톤을 유지합니다.' : 'Keep AI framed as an experiment instead of an oversized headline promise.',
                    eyebrow: isKr ? 'Experiment' : 'Experiment',
                },
            ],
            links: [
                { label: isKr ? '관리자 보기' : 'Learn More', href: externalLinks.admin },
                { label: isKr ? '문의 보기' : 'Contact', to: '/contact' },
                { label: isKr ? '블로그 읽기' : 'Read More', to: '/blog' },
            ],
            detailCards: [
                {
                    label: isKr ? 'Wellness App' : 'Wellness App',
                    title: isKr ? '정식 공개 전, 먼저 소개로 만나는 앱' : 'Structured, but still introduced carefully',
                    body: isKr ? '온보딩과 컨디션 요약, 차 추천, 블렌딩 흐름까지 준비돼 있어도 지금은 앱 링크보다 소개와 스크린샷이 먼저 읽히는 편이 자연스럽습니다.' : 'The welness_app project already has onboarding, condition summary, tea recommendation, and blend flows. For now, it reads more naturally through explanation and visuals than a direct app CTA.',
                },
                {
                    label: isKr ? 'Admin' : 'Admin',
                    title: isKr ? '대시보드와 멤버 관리 흐름까지 소개' : 'Dashboard structure confirmed',
                    body: isKr ? '운영 대시보드와 멤버 뷰, 상세 리포트 흐름을 함께 보여줘야 어드민의 역할이 더 분명하게 전해집니다.' : 'The dashboard, member views, and detail report flow make the admin layer clearer when they are shown together.',
                },
                {
                    label: isKr ? 'AI Beta' : 'AI Beta',
                    title: isKr ? '추천 경험을 다듬는 중' : 'Refining a recommendation flow',
                    body: isKr ? 'AI 베타는 과하게 앞세우기보다, 관심이 생기면 문의나 추후 링크로 이어지는 작은 프리뷰가 더 어울립니다.' : 'AI beta fits better as a small preview that can later route into inquiry or a dedicated link, rather than a hard promise today.',
                },
                {
                    label: isKr ? 'Priority' : 'Priority',
                    title: isKr ? '설명보다 실제 화면이 함께 보여야 합니다' : 'Information structure before consolidation',
                    body: isKr ? '디지털 레이어는 짧은 문장만으로 끝내기보다, 실제 앱과 어드민 화면이 함께 보일 때 훨씬 설득력이 커집니다.' : 'The digital layer becomes more persuasive when real app and admin screens are shown alongside the copy.',
                },
            ],
            galleryCards: [
                {
                    title: isKr ? '오늘의 홈' : 'Home screen',
                    body: isKr ? '오늘의 컨디션과 추천 블렌드를 한눈에 확인하는 앱의 첫 화면입니다.' : 'The home screen brings today’s condition and recommended blends together.',
                },
                {
                    title: isKr ? '커스텀 블렌딩' : 'Custom blending',
                    body: isKr ? '재료 비율과 밸런스를 직접 조절하는 핵심 경험 화면입니다.' : 'A key screen where ingredients and balance are adjusted directly.',
                },
                {
                    title: isKr ? '운영 대시보드' : 'Dashboard view',
                    body: isKr ? '전체 운영 흐름과 주요 지표를 넓은 화면에서 읽는 어드민 첫 화면입니다.' : 'The admin dashboard reads the overall operations flow and key metrics on a wider screen.',
                },
                {
                    title: isKr ? '멤버 상세 리포트' : 'Member detail',
                    body: isKr ? '한 명의 기록과 블렌드 로그를 깊게 읽는 상세 화면입니다.' : 'A detailed view for reading one member’s logs and blend history.',
                },
            ],
            faqItems: [
                {
                    q: isKr ? '왜 앱 링크를 바로 열지 않나요?' : 'Why not link directly into the app yet?',
                    a: isKr ? '웹 프리뷰는 가능하지만, 지금은 앱으로 바로 보내기보다 이 페이지에서 경험의 결을 먼저 보여주는 편이 더 자연스럽습니다.' : 'A web preview is possible, but for now it feels better to show the context of the experience here before sending visitors directly into the app.',
                },
                {
                    q: isKr ? '관리자 링크를 Digital에 넣는 이유는 뭔가요?' : 'Why place admin under Digital?',
                    a: isKr ? '브랜드 메인 동선과 분리된 도구 영역으로 다루기 가장 자연스러운 위치이기 때문입니다.' : 'Because Digital is the cleanest place to separate internal tools from the primary brand and customer flow.',
                },
                {
                    q: isKr ? 'AI 베타는 지금 바로 노출해도 되나요?' : 'Should AI beta be heavily exposed right now?',
                    a: isKr ? '아직은 아닙니다. 지금은 작은 프리뷰처럼 두고, 실제 공개 시점이 오면 그때 더 전면에 놓는 편이 좋습니다.' : 'Not yet. For now it works better as a small preview, then it can move forward once the product is ready.',
                },
            ],
            notes: [
                isKr ? '웰니스 앱과 어드민은 실제 소개 자료와 스크린샷을 기준으로 정리하되, 정식 공개 전까지는 Digital 페이지 안에서 차분하게 안내합니다.' : 'The wellness app and admin are now represented with their real intro assets and screenshots, while still being introduced calmly inside the Digital page.',
            ],
        },
        contact: {
            eyebrow: isKr ? 'CONTACT' : 'CONTACT',
            title: isKr ? '연락과 방문, 소셜 연결을 위한 가장 가벼운 안내입니다.' : 'A page for contact, visiting, and social links.',
            description: isKr
                ? '연락처와 방문 기본 정보를 한 번에 보여주고, 필요한 다음 행동으로 자연스럽게 이어줍니다.'
                : 'Contact details, visit basics, and the next useful links are gathered in one calm place.',
            image: '/assets/story/main-mobile.webp',
            imageAlt: isKr ? '베리굿 연락처와 방문 안내' : 'Very Good contact and visit guide',
            facts: [
                { label: isKr ? 'Email' : 'Email', value: profile.email },
                { label: isKr ? 'Tel' : 'Tel', value: profile.phone },
                { label: 'Instagram', value: profile.instagramHandle },
            ],
            highlights: [
                isKr ? '주소와 운영시간' : 'Address and opening hours',
                isKr ? '이메일과 전화' : 'Email and phone',
                isKr ? 'Instagram과 서비스 링크' : 'Instagram and service links',
            ],
            modules: [
                {
                    title: isKr ? 'Visit' : 'Visit',
                    body: isKr
                        ? '방문 전 필요한 정보는 Contact와 Store 어디에서든 쉽게 보이는 편이 좋습니다.'
                        : 'Visit details should stay easy to find in both Contact and Store.',
                },
                {
                    title: isKr ? 'Support' : 'Support',
                    body: isKr
                        ? '배송, 환불, 약관 링크도 이 페이지에서 바로 찾을 수 있도록 두었습니다.'
                        : 'Shipping, refund, and terms links should stay quickly reachable here as well.',
                },
                {
                    title: isKr ? 'Social' : 'Social',
                    body: isKr
                        ? '인스타그램은 브랜드 분위기를 가장 가볍게 이어주는 소셜 채널입니다.'
                        : 'Instagram is the light social layer that carries the brand tone outward.',
                },
            ],
            featureCards: [
                {
                    title: isKr ? '빠른 문의' : 'Quick contact',
                    body: isKr ? '이메일과 전화가 가장 먼저 보이도록 두어 문의 흐름을 단순하게 만들었습니다.' : 'Keep email and phone immediately visible, leaving a form as a later decision.',
                    eyebrow: isKr ? 'Support' : 'Support',
                },
                {
                    title: isKr ? '매장 안내' : 'Store guidance',
                    body: isKr ? 'Store 페이지와 정보가 겹치더라도, 찾기 쉬운 편이 더 중요합니다.' : 'Repeating key store information is better than making it hard to find.',
                    eyebrow: isKr ? 'Visit' : 'Visit',
                },
                {
                    title: isKr ? '브랜드 소셜' : 'Brand social',
                    body: isKr ? 'Instagram은 브랜드의 분위기와 최신 장면을 전하는 채널로 남겨둡니다.' : 'Instagram remains the ambient social layer carrying the editorial tone outward.',
                    eyebrow: isKr ? 'Social' : 'Social',
                },
            ],
            links: [
                { label: 'Instagram', href: externalLinks.instagram, external: true },
                { label: isKr ? '블로그 읽기' : 'Read More', to: '/blog' },
                { label: isKr ? '매장 방문' : 'Visit', to: '/store' },
            ],
            detailCards: [
                {
                    label: isKr ? 'Email' : 'Email',
                    title: profile.email,
                    body: isKr ? '문의는 메일 기반으로 안내하는 것이 가장 단순하고 분명합니다.' : 'For now, email is the simplest and safest support path to present clearly.',
                },
                {
                    label: isKr ? 'Tel' : 'Tel',
                    title: profile.phone,
                    body: isKr ? '운영 문의나 방문 전 확인을 위해 전화 정보도 함께 두는 편이 좋습니다.' : 'Phone details should remain visible alongside email for operational and pre-visit questions.',
                },
                {
                    label: isKr ? 'Visit' : 'Visit',
                    title: profile.addressFull,
                    body: isKr ? 'Store 페이지와 같은 주소를 반복해 보여주더라도, 찾기 쉬운 편이 더 중요합니다.' : 'Repeating the same address as the Store page is better than making it harder to find.',
                },
                {
                    label: 'Instagram',
                    title: profile.instagramHandle,
                    body: isKr ? '브랜드 분위기와 최신 소식을 전하는 소셜 채널은 Contact에서도 자연스럽게 이어집니다.' : 'The brand’s social tone should extend naturally into the Contact page as well.',
                },
            ],
            faqItems: [
                {
                    q: isKr ? '문의 폼이 꼭 필요한가요?' : 'Do we need a contact form right now?',
                    a: isKr ? '아직은 아닙니다. 메일과 전화, 인스타그램만으로도 문의 흐름은 충분히 분명하게 만들 수 있습니다.' : 'Not yet. Email, phone, and Instagram already make the contact flow clear enough.',
                },
                {
                    q: isKr ? '방문 정보는 Contact와 Store 중 어디서 봐야 하나요?' : 'Should visit details live in Contact or Store?',
                    a: isKr ? '둘 다입니다. Contact는 빠른 확인, Store는 더 풍부한 방문 안내를 담당하는 구조가 적절합니다.' : 'Both. Contact handles quick reference, while Store carries the fuller visit guidance.',
                },
                {
                    q: isKr ? '인스타그램 링크는 왜 중요하죠?' : 'Why is the Instagram link important here?',
                    a: isKr ? '브랜드의 분위기와 최신 현장 감도를 보여주는 채널이기 때문에 Contact에서도 보이는 편이 좋습니다.' : 'Because it carries the brand atmosphere and current in-person feel, so it belongs on Contact as well.',
                },
            ],
            notes: [
                isKr ? '문의 폼이 필요해지면 현재 페이지에 직접 추가하거나 기존 메일 흐름으로 연결할 수 있습니다.' : 'If a contact form is needed later, this page can host it directly or route into the existing email flow.',
            ],
        },
    };
}
