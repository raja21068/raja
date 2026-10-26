from pathlib import Path
import re,base64
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
p=Path(__file__).parent
html=(p/'index.html').read_text()
soup=BeautifulSoup(html,'html.parser')
assert len(soup.select('[data-video]'))==2
assert len(soup.select('.project-card'))==6
assert len(soup.select('.paper-row'))==10
assert len(soup.select('[data-stage]'))==4
for id in ('featured','demos','software','videos','publications','dialog-backdrop','video-backdrop'):
 assert soup.select_one('#'+id),id
for q in soup.select('a[href^="#"]'):
 path=q['href']
 if path=='#top' or path.startswith('#/'):continue
 assert soup.select_one(path),('bad internal link',path)
# Build only test-time in-memory document because this container blocks local file URLs.
s=re.sub(r'<link rel="preconnect" href="https://fonts[^>]+>', '',html)
s=re.sub(r'<link href="https://fonts\.googleapis\.com[^>]+>', '',s)
s=s.replace('<link rel="stylesheet" href="legacy.css"><link rel="stylesheet" href="design.css">','<style>'+re.sub(r'@import url\([^;]+;', '',(p/'legacy.css').read_text())+'\n'+(p/'design.css').read_text()+'</style>')
s=s.replace('<script src="app.js" defer></script><script src="redesign.js" defer></script>','')
for asset in (p/'assets').glob('*'):
 if asset.suffix.lower() in ('.jpg','.png','.svg'):
  mime={'jpg':'image/jpeg','png':'image/png','svg':'image/svg+xml'}[asset.suffix[1:]]
  url='data:'+mime+';base64,'+base64.b64encode(asset.read_bytes()).decode()
  s=s.replace('assets/'+asset.name,url)
s=re.sub(r'https://img\.youtube\.com/vi/[^" ]+', '',s)
s=s.replace('</body>','<script>'+(p/'app.js').read_text()+'</script><script>'+(p/'redesign.js').read_text()+'</script></body>')
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 page=browser.new_page(viewport={'width':1440,'height':900},device_scale_factor=1)
 page.set_default_timeout(3500)
 errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content(s,wait_until='domcontentloaded',timeout=15000)
 assert page.locator('.project-card:visible').count()==6
 page.locator('.filter[data-filter="medical"]').click(force=True)
 assert page.locator('.project-card:visible').count()==2
 page.locator('.filter[data-filter="all"]').click(force=True)
 page.locator('.project-card[data-open="autolabel"]').click(force=True)
 page.wait_for_timeout(150)
 assert page.locator('#dialog-backdrop').is_visible()
 page.locator('#dialog-close').click(force=True)
 page.wait_for_timeout(120)
 assert not page.locator('#dialog-backdrop').is_visible()
 page.locator('.workflow-tab[data-stage="2"]').click(force=True)
 assert 'traceable' in page.locator('#workflow-detail h3').inner_text().lower()
 page.locator('#paper-search').fill('2025')
 assert page.locator('.paper-row:visible').count()==2
 page.locator('#paper-search').fill('')
 assert page.locator('.paper-row:visible').count()==10
 # Smoke-test an executable simulator's controls rather than claiming real research metrics.
 page.locator('.project-card[data-open="federated"]').click(force=True)
 page.wait_for_timeout(120)
 assert page.locator('#dialog-backdrop').is_visible()
 assert page.locator('#f-run').count()==1
 page.locator('#dialog-close').click(force=True)
 page.wait_for_timeout(90)
 page.locator('.video-cover[data-video="vhvtOVsnYLg"]').click(force=True)
 assert page.locator('#video-backdrop').is_visible()
 assert 'vhvtOVsnYLg' in page.locator('#video-player iframe').get_attribute('src')
 page.locator('#video-close').click(force=True)
 assert not page.locator('#video-backdrop').is_visible()
 assert not errors,errors
 page.screenshot(path=str(p/'preview-desktop.png'),full_page=True,timeout=20000)
 page.set_viewport_size({'width':390,'height':844})
 page.wait_for_timeout(50)
 assert not page.evaluate('document.documentElement.scrollWidth > window.innerWidth'), 'mobile horizontal overflow'
 page.screenshot(path=str(p/'preview-mobile.png'),full_page=True,timeout=20000)
 browser.close()
print('PASS: 6 demos, 10 selected papers, filtering, project modals, pipeline, paper search, video modal, desktop/mobile layouts')
