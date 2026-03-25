import { projectIntegrations } from './projectIntegrations';

const logoSet = [
    '/assets/logos/logo-1.png',
    '/assets/logos/logo-2.png',
    '/assets/logos/logo-3.png',
    '/assets/logos/logo-4.png',
];

export const sectionAssets = {
    brand: {
        hero: {
            type: 'image',
            src: '/assets/story/story-1.png',
            alt: 'Very Good brand story',
        },
        card: {
            type: 'image',
            src: '/assets/story/story-hogirl.png',
            alt: 'Very Good brand thumbnail',
        },
        gallery: [
            {
                type: 'image',
                src: '/assets/story/story-1.png',
                alt: 'Very Good philosophy visual',
            },
            {
                type: 'image',
                src: '/assets/story/story-hogirl.png',
                alt: 'Very Good signature character visual',
            },
            {
                type: 'image',
                src: '/assets/story/australia-map.png',
                alt: 'Very Good origin and sourcing visual',
            },
        ],
    },
    products: {
        hero: {
            type: 'image',
            src: '/assets/products/4set.png',
            alt: 'Very Good products thumbnail',
        },
        card: {
            type: 'image',
            src: '/assets/products/2set.png',
            alt: 'Very Good products card thumbnail',
        },
    },
    store: {
        hero: {
            type: 'image',
            src: '/assets/story/main.webp',
            alt: 'Very Good store visual',
        },
        card: {
            type: 'image',
            src: '/assets/story/main-mobile.webp',
            alt: 'Very Good store card thumbnail',
        },
        gallery: [
            {
                type: 'image',
                src: '/assets/story/main.webp',
                alt: 'Very Good store atmosphere',
            },
            {
                type: 'image',
                src: projectIntegrations.storeExperience.assets.map,
                alt: 'Very Good store map preview',
            },
            {
                type: 'image',
                src: projectIntegrations.storeExperience.assets.logo,
                alt: 'Very Good store logo detail',
            },
        ],
    },
    services: {
        hero: {
            type: 'image',
            src: projectIntegrations.reservation.assets.hero,
            alt: 'Very Good reservation service visual',
        },
        card: {
            type: 'image',
            src: projectIntegrations.reservation.assets.hero,
            alt: 'Very Good services card thumbnail',
        },
        gallery: [
            {
                type: 'image',
                src: projectIntegrations.reservation.assets.hero,
                alt: 'Very Good reservation page hero image',
            },
            {
                type: 'image',
                src: '/assets/products/4set.png',
                alt: 'Very Good gifting visual',
            },
            {
                type: 'image',
                src: '/assets/products/british_cup.webp',
                alt: 'Very Good review and product ritual visual',
            },
        ],
    },
    wellnessApp: {
        hero: {
            type: 'image',
            src: projectIntegrations.wellnessApp.assets.hero,
            alt: 'Wellness app hero visual',
            fit: 'contain',
        },
        card: {
            type: 'image',
            src: projectIntegrations.wellnessApp.assets.hero,
            alt: 'Wellness app card thumbnail',
            fit: 'contain',
        },
    },
    wellnessAdmin: {
        hero: {
            type: 'image',
            src: projectIntegrations.wellnessAdmin.assets.dashboard,
            alt: 'Wellness admin dashboard screenshot',
            fit: 'contain',
        },
        card: {
            type: 'image',
            src: projectIntegrations.wellnessAdmin.assets.dashboard,
            alt: 'Wellness admin card screenshot',
            fit: 'contain',
        },
    },
    reservation: {
        hero: {
            type: 'image',
            src: projectIntegrations.reservation.assets.hero,
            alt: 'Reservation page hero visual',
        },
        card: {
            type: 'image',
            src: projectIntegrations.reservation.assets.hero,
            alt: 'Reservation card thumbnail',
        },
    },
    reviewEvent: {
        hero: {
            type: 'image',
            src: projectIntegrations.reviewEvent.assets.hero,
            alt: 'Review event hero visual',
        },
        card: {
            type: 'image',
            src: projectIntegrations.reviewEvent.assets.hero,
            alt: 'Review event card thumbnail',
        },
    },
    digital: {
        hero: {
            type: 'graphic',
            theme: 'digital',
            title: 'Digital Layer',
            chips: ['Wellness', 'Admin', 'Beta'],
            logos: logoSet,
        },
        card: {
            type: 'graphic',
            theme: 'digital',
            title: 'Digital',
            chips: ['App', 'Tools', 'AI'],
            logos: logoSet.slice(0, 3),
        },
        gallery: [
            {
                type: 'image',
                src: projectIntegrations.wellnessApp.assets.home,
                alt: 'Wellness app home preview image',
                fit: 'contain',
            },
            {
                type: 'image',
                src: projectIntegrations.wellnessApp.assets.customBlend,
                alt: 'Wellness app custom blend screenshot',
                fit: 'contain',
            },
            {
                type: 'image',
                src: projectIntegrations.wellnessAdmin.assets.dashboardIntro,
                alt: 'Wellness admin dashboard screenshot',
                fit: 'contain',
            },
            {
                type: 'image',
                src: projectIntegrations.wellnessAdmin.assets.memberDetail,
                alt: 'Wellness admin member detail screenshot',
                fit: 'contain',
            },
        ],
        story: [
            {
                type: 'image',
                src: projectIntegrations.wellnessApp.assets.overview,
                alt: 'Wellness app overview screen',
                fit: 'contain',
            },
            {
                type: 'image',
                src: projectIntegrations.wellnessApp.assets.home,
                alt: 'Wellness app home screen',
                fit: 'contain',
            },
            {
                type: 'image',
                src: projectIntegrations.wellnessApp.assets.customBlend,
                alt: 'Wellness app custom blend screen',
                fit: 'contain',
            },
            {
                type: 'image',
                src: projectIntegrations.wellnessAdmin.assets.dashboardIntro,
                alt: 'Wellness admin dashboard intro screen',
                fit: 'contain',
            },
            {
                type: 'image',
                src: projectIntegrations.wellnessAdmin.assets.members,
                alt: 'Wellness admin members screen',
                fit: 'contain',
            },
        ],
    },
    blog: {
        hero: {
            type: 'image',
            src: '/assets/ceative-cacao/creative_intro.webp',
            alt: 'Very Good blog visual',
        },
        card: {
            type: 'image',
            src: '/assets/story/story-1.png',
            alt: 'Very Good blog card thumbnail',
        },
    },
    contact: {
        hero: {
            type: 'graphic',
            theme: 'contact',
            title: 'Contact',
            chips: ['Email', 'Store', 'Instagram'],
            logos: ['/assets/logos/logo-1.png', '/assets/logos/logo-4.png'],
        },
        card: {
            type: 'graphic',
            theme: 'contact',
            title: 'Visit & Reach',
            chips: ['Email', 'Phone', 'Visit'],
            logos: ['/assets/logos/logo-2.png', '/assets/logos/logo-3.png'],
        },
    },
};

export function getSectionAsset(key, variant = 'card') {
    return sectionAssets[key]?.[variant] ?? null;
}

export function getSectionAssetCollection(key, variant) {
    return sectionAssets[key]?.[variant] ?? [];
}
