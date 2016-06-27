require([
  'loadTemplates',
  'tinyAct',
], (
  loadTemplates,
  { createElement: ce }
) => {
  const articles = fetch('./data/articles.json').then(data => data.json())

  const tinyel = (
    ce('p', { className: 'foobish' },
      'Some text!',
      ce('span', { style: 'color: "#F00";' }, ' some more text! '),
      ce('img', { src: '/image.jpg', width: 500, height: 300 })
    )
  )

  document.addEventListener('DOMContentLoaded', () => {
    const templates = loadTemplates();
    const main = document.querySelector('main')
    articles.then(data => {
      main.innerHTML += data.map(ob => templates.article(ob)).join('')
    })
    main.appendChild(tinyel)
  })
})
