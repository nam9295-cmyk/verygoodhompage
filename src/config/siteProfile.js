export function getSiteProfile(isKr) {
    return {
        companyName: isKr ? '주식회사 베리굿' : 'Very Good Co., Ltd.',
        owner: isKr ? '천정민' : 'JEONGMIN CHEON',
        businessLicense: '850-81-02950',
        mailOrderLicense: '2023-DaeguDalseo-1940',
        addressShort: isKr ? '대구 수성구 상록로 11길 13, 1층' : '1F 13 Sangnok-ro 11-gil, Suseong-gu, Daegu',
        addressFull: isKr
            ? '대구광역시 수성구 상록로 11길 13, 1층'
            : '1F 13 Sangnok-ro 11-gil, Suseong-gu, Daegu, Republic of Korea',
        hours: isKr ? '월-토 11:00 - 19:00' : 'Mon-Sat 11:00 - 19:00',
        email: 'verygoutchocolate@gmail.com',
        phone: '+82-70-7840-0717',
        instagramHandle: '@verygood_chocolate',
    };
}
