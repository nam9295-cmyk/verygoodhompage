import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'
import { AU_LINKS } from '../src/config/auLinks.js'
import { getAuSiteContent } from '../src/config/auSiteContent.js'

async function renderHome(locale,t) {
  const server=await createServer({appType:'custom',server:{middlewareMode:true,ws:false}})
  t.after(()=>server.close())
  const {default:AuHomePage}=await server.ssrLoadModule('/src/pages/au/AuHomePage.jsx')
  return renderToStaticMarkup(createElement(MemoryRouter,{initialEntries:[locale==='ko'?'/ko':'/']},createElement(AuHomePage,{locale})))
}

test('brand homepage presents current 5/4/3 AU menu and no discontinued Sydney product cards',async t=>{
  const html=await renderHome('en',t)
  for(const value of ['CHOCOLATIER’S','CHOCOLATE MOCHI','Official Sydney shop','Order Pavé Mochi','Cake &amp; Bake','Chocolate','Celebrate','Custom Cake'])assert.ok(html.includes(value),value)
  const content=getAuSiteContent('en')
  assert.deepEqual(content.coreExperiences.map(c=>c.products.length),[5,4,3])
  for(const p of content.coreExperiences.flatMap(c=>c.products))assert.ok(html.includes(p.name),p.name)
  for(const old of ['Vanilla Fresh Cream Cake','Buttercream Cake','Lemon Cake','Something Fresh','Cacao Tea'])assert.equal(html.includes(old),false,old)
  assert.match(html,/https:\/\/au\.verygood-chocolate\.com\/chocolates\/chocolate-mochi/)
  assert.match(html,/https:\/\/kr\.verygood-chocolate\.com/)
  assert.match(html,/https:\/\/au\.verygood-chocolate\.com\/reviews/)
  assert.match(html,/https:\/\/au\.verygood-chocolate\.com\/lookup/)
  assert.doesNotMatch(html,/Add to Cart|Checkout|Buy Now/i)
  assert.ok(html.indexOf('id="cakes"')<html.indexOf('id="chocolates"'))
  assert.ok(html.indexOf('id="chocolates"')<html.indexOf('id="celebrate"'))
})

test('three latest AU collection tiles lead directly to the respective Sydney collections',async t=>{
  const html=await renderHome('en',t)
  const content=getAuSiteContent('en')
  for(const c of content.categories){
    assert.ok([AU_LINKS.booking.cakes,AU_LINKS.booking.chocolates,AU_LINKS.booking.celebrate].includes(c.href))
    assert.ok(c.image.startsWith('https://au.verygood-chocolate.com/products/'))
    assert.ok(html.includes('href="'+c.href+'"'),c.href)
    assert.ok(html.includes('src="'+c.image+'"'),c.image)
  }
  assert.equal((html.match(/class="au-home-collection-card"/g)||[]).length,3)
  assert.match(html,/target="_blank" rel="noreferrer"/)
  assert.doesNotMatch(html,/href="\/(?:chocolate|tea|goods)"/)
})

test('three collection tiles preserve desktop visual grid and mobile single column',()=>{
  const source=readFileSync('src/pages/au/AuHomePage.jsx','utf8')
  const css=readFileSync('src/styles/au-site.css','utf8')
  assert.match(source,/className="au-home-collection-grid"/)
  assert.match(css,/\.au-home-collection-grid\s*\{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/)
  assert.match(css,/@media \(max-width: 767px\) \{[\s\S]*?\.au-home-collection-grid\s*\{\s*grid-template-columns: 1fr/)
})

test('Mochi campaign uses correct responsive originals, editable type and direct booking CTA', async t => {
  const html = await renderHome('en', t)
  const hero = html.match(/<section class="au-hero au-hero--mochi">[\s\S]*?<\/section>/)?.[0]
  assert.ok(hero)
  assert.match(hero, /<source media="\(max-width: 767px\)" srcSet="\/assets\/mochi\/mochi-cafe\.webp"/)
  assert.match(hero, /<img src="\/assets\/mochi\/mochi-street\.webp" alt=""/)
  for (const text of ['CHOCOLATIER’S', 'CHOCOLATE MOCHI', 'Discover Pavé Mochi in Sydney', 'official Sydney shop']) {
    assert.ok(hero.includes(text), text)
  }
  assert.match(hero, /href="https:\/\/au\.verygood-chocolate\.com\/chocolates\/chocolate-mochi"/)
  assert.ok(hero.indexOf('Order Pavé Mochi') < hero.indexOf('Explore current menu'))
  assert.match(hero, /href="\/#cakes"/)
})

test('each current product photo and action links to its actual AU detail',async t=>{
  const html=await renderHome('en',t)
  const blocks=[...html.matchAll(/<article class="au-booking-product-card">([\s\S]*?)<\/article>/g)].map(m=>m[0])
  const products=getAuSiteContent('en').coreExperiences.flatMap(x=>x.products)
  assert.equal(blocks.length,12)
  for(const p of products){
    const cards=blocks.filter(b=>b.includes('href="'+p.href+'"'))
    assert.equal(cards.length,1,p.id)
    assert.ok(cards[0].includes('src="'+p.image.src+'"'),p.id)
    assert.ok(cards[0].includes('<h3>'+p.name+'</h3>'),p.id)
    assert.equal((cards[0].match(/href="/g)||[]).length,2,p.id)
    assert.ok(cards[0].includes(p.ctaLabel.replaceAll('&','&amp;')),p.id)
    assert.equal(cards[0].includes('class="au-booking-product-card__status"'),p.comingSoon,p.id)
    assert.doesNotMatch(cards[0],/target="_blank"/)
  }
})

test('home uses verified live AU public product photos and keeps local brand art',()=>{
  for(const file of ['public/assets/mochi/mochi-street.webp','public/assets/mochi/mochi-cafe.webp','public/assets/brand/heart_logo.png','public/assets/brand/tiger-pattern-desktop.webp','public/assets/brand/tiger-pattern-mobile.webp'])assert.ok(existsSync(resolve(file)),file)
  const products=getAuSiteContent('en').coreExperiences.flatMap(x=>x.products)
  assert.equal(products.length,12)
  assert.ok(products.every(p=>p.image.src.startsWith('https://au.verygood-chocolate.com/products/')))
  const css=readFileSync('src/styles/au-site.css','utf8')
  assert.match(css,/\.au-home > :not\(\.au-hero\) \.au-shell\s*\{\s*width: 100%;\s*max-width: none;/)
  assert.match(css,/\.au-home \.au-core-experiences \.au-experience\s*\{\s*padding-inline: 0;/)
})

test('Korean edition preserves brand story and localized Sydney product routes',async t=>{
  const html=await renderHome('ko',t)
  assert.match(html,/CHOCOLATIER’S/)
  assert.match(html,/파베 모찌 예약하기/)
  assert.match(html,/시드니 온라인 주문/)
  assert.match(html,/파베 모찌/)
  assert.match(html,/href="https:\/\/kr\.verygood-chocolate\.com"/)
  assert.match(html,/href="https:\/\/au\.verygood-chocolate\.com\/chocolates\/chocolate-mochi"/)
})
