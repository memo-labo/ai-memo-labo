document.addEventListener('DOMContentLoaded', () => {
  const books = [
    ['https://amzn.to/4fJ2QUA','大写解 高圧受電設備','https://memo-labo.com/images/hon1.jpg'],
    ['https://amzn.to/4fyfztj','電気管理技術者必携','https://memo-labo.com/images/dk1.jpg'],
    ['https://amzn.to/4eMcTqR','電気Q&A 電気設備のトラブル事例','https://memo-labo.com/images/trouble1.jpg'],
    ['https://amzn.to/40RFJTd','電気技術者のための失敗100選','https://memo-labo.com/images/sp1.jpg'],
    ['https://amzn.to/3KlX2WB','電気技術者の実務理論','https://memo-labo.com/images/jitumu.jpg'],
    ['https://link.amazon/B05rQUKdL','電験三種受験テキスト 理論','https://memo-labo.com/images/20261008-1.jpg']
  ];
  const article = document.querySelector('main article');
  if (!article) return;
  const candidates = [...article.querySelectorAll('h2, h3, p, img')].filter(el =>
    !el.closest('aside, nav, a, .amazon-random-ad') && el.parentElement === article
  );
  const shuffle = values => {
    const items = [...values];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  };
  const count = Math.min(2, candidates.length, books.length);
  const positions = shuffle(candidates).slice(0, count);
  const selected = shuffle(books).slice(0, count);
  positions.forEach((position, i) => {
    const [url, title, image] = selected[i];
    const aside = document.createElement('aside');
    aside.className = 'amazon-random-ad';
    aside.setAttribute('aria-label', 'Amazonの商品紹介（広告）');
    aside.style.cssText = 'margin:24px 0;padding:16px;border:1px solid #ddd;border-radius:8px;text-align:center';
    const label = document.createElement('small');
    label.textContent = '広告・Amazonアソシエイト';
    label.style.display = 'block';
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'nofollow sponsored noopener';
    link.style.cssText = 'display:inline-flex;flex-direction:column;align-items:center;gap:8px';
    const img = document.createElement('img');
    img.src = image;
    img.alt = title;
    img.loading = 'lazy';
    img.style.cssText = 'max-width:200px;width:100%;height:auto';
    const name = document.createElement('span');
    name.textContent = title;
    link.append(img, name);
    aside.append(label, link);
    position.insertAdjacentElement('afterend', aside);
  });
});
