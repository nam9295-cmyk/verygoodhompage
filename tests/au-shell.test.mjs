import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'
import { AU_LINKS } from '../src/config/auLinks.js'

async function shell() {
  const s=await createServer({appType:'custom',server:{middlewareMode:true,ws:false}})
  const [{default: Header},{default: Footer},{default: Layout}] = await Promise.all([
    s.ssrLoadModule('/src/components/au/AuHeader.jsx'),
    s.ssrLoadModule('/src/components/au/AuFooter.jsx'),
    s.ssrLoadModule('/src/components/au/AuLayout.jsx'),
  ])
  return {s, Header, Footer, Layout}
}
const render=(C,locale='en')=>renderToStaticMarkup(createElement(MemoryRouter,{initialEntries:[locale==='en'?'/':'/ko']},createElement(C,{locale})))

test('root brand header and footer show current Sydney categories and keep the Korea portal',async t=>{
  const {s,Header,Footer}=await shell();t.after(()=>s.close())
  const header=render(Header),footer=render(Footer),all=header+footer
  for (const label of ['Cake &amp; Bake','Chocolate','Celebrate','Custom Cake','Business','Korea','SHOP SYDNEY','Shop Sydney']) assert.match(all,new RegExp(label))
  for (const url of [AU_LINKS.booking.home,AU_LINKS.booking.cakes,AU_LINKS.booking.chocolates,AU_LINKS.booking.celebrate,AU_LINKS.booking.customCakes,AU_LINKS.booking.business,AU_LINKS.booking.lookup,AU_LINKS.booking.reviews,AU_LINKS.korea]) assert.ok(all.includes(url),url)
  assert.doesNotMatch(header, /Cacao Tea|Something Fresh|Whole Cakes|href="\/tea"|href="\/goods"/)
  assert.doesNotMatch(header, /Kids Classes|Add to Cart|Checkout/i)
  assert.match(header,/\/assets\/brand\/heart_logo\.png/)
  const koHeader=render(Header,'ko')
  assert.match(koHeader,/케이크 &amp; 베이크/)
  assert.match(koHeader,/시드니 예약/)
  assert.match(koHeader,/https:\/\/kr\.verygood-chocolate\.com/)
})

test('brand tiger wallpaper and existing regional layout remain intact',async t=>{
  const {s,Layout}=await shell();t.after(()=>s.close())
  const html=render(Layout)
  assert.match(html, /<div class="au-fixed-tiger-background" aria-hidden="true"><\/div>/)
  assert.ok(html.indexOf('au-fixed-tiger-background')<html.indexOf('<main id="main-content">'))
})
