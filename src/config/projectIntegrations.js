export const projectIntegrations = {
    instagram: {
        href: 'https://www.instagram.com/verygood_chocolate/',
    },
    wellnessApp: {
        title: 'Wellness App',
        status: 'preview-hidden',
        href: null,
        fallbackTo: '/digital',
        sourcePath: '/Users/nam9295/Desktop/john_2.0/code/welness_app',
        cardBody: {
            ko: '나만의 차를 찾는 웰니스 다이어리. 곧 선보일 예정입니다.',
            en: 'A wellness diary to find your perfect tea. Coming soon.',
        },
        assets: {
            hero: '/assets/integrations/wellness-app-hero.webp',
            icon: '/assets/integrations/wellness-app-icon.png',
        },
    },
    wellnessAdmin: {
        title: 'Admin Dashboard',
        status: 'internal',
        href: '/admin',
        sourcePath: '/Users/nam9295/Desktop/john_2.0/code/welness_admin',
        cardBody: {
            ko: '브랜드와 공간을 단단하게 가꾸는 우리의 내부 운영 도구.',
            en: 'Our internal dashboard for quietly managing the store and members.',
        },
        assets: {
            dashboard: '/assets/integrations/screenshots/wellness-admin-dashboard.png',
            parentMode: '/assets/integrations/screenshots/wellness-admin-parent-mode.png',
        },
    },
    reservation: {
        title: 'Cake Reservation',
        status: 'live',
        href: 'https://partner.verygood-chocolate.com',
        sourcePath: '/Users/nam9295/Desktop/john_2.0/code/partners',
        cardBody: {
            ko: '소중한 날을 위한 케이크. 오직 예약으로만 준비됩니다.',
            en: 'Cakes for your special days. Prepared by reservation only.',
        },
        assets: {
            hero: '/assets/integrations/cake-reservation-hero.webp',
        },
    },
    reviewEvent: {
        title: 'Reviews',
        status: 'live',
        href: 'https://reciept.verygood-chocolate.com/',
        sourcePath: '/Users/nam9295/Desktop/john_2.0/code/영수증리뷰이벤트',
        cardBody: {
            ko: '베리굿에 남겨주신 손님들의 따뜻한 이야기들.',
            en: 'Warm reviews and stories shared by our guests.',
        },
        assets: {
            hero: '/assets/integrations/review-event-hero.webp',
        },
    },
    storeExperience: {
        title: 'Visit the Store',
        status: 'internal-hub',
        href: '/store',
        mapHref: 'https://map.naver.com/p/entry/place/1069379954',
        sourcePath: '/Users/nam9295/Desktop/john_2.0/code/vcc체험단페이지',
        assets: {
            map: '/assets/integrations/store-map.png',
            logo: '/assets/integrations/store-logo.png',
        },
    },
    aiBeta: {
        title: 'AI Recommendation Beta',
        status: 'pending',
        href: null,
        fallbackTo: '/digital',
    },
};

export const externalLinks = {
    instagram: projectIntegrations.instagram.href,
    reviews: projectIntegrations.reviewEvent.href,
    reservation: projectIntegrations.reservation.href,
    storeMap: projectIntegrations.storeExperience.mapHref,
    admin: projectIntegrations.wellnessAdmin.href,
    wellnessApp: projectIntegrations.wellnessApp.href,
    aiBeta: projectIntegrations.aiBeta.href,
};
