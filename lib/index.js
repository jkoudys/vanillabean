require([
  'react',
  'react-dom',
  'loadTemplates',
  'tinyAct',
  'toggle',
  'logo',
], (
  { createElement: ce },
  { render },
  loadTemplates,
  tinyAct,
  Toggle,
  Logo
) => {
//  const articles = fetch('./data/articles.json', { mode: 'no-cors' }).then(data => data.json());
  const articles = Promise.resolve([
    {
      title: 'A great article',
      text: 'Something about why this article is great.',
    },
    {
      title: 'Ever and more',
      text: 'Yet another article',
    },
    {
      title: 'A lesser article',
      text: 'This is still pretty good. As great as the best article? No. But good.',
    },
    {
      title: 'Some other article',
      text: 'Normally we\'d grab these from a web service, eh?',
    },
  ]);

  const tinyel = (
    ce('p', { className: 'foobish' },
       'Some text!',
       ce(Toggle),
       ce('span', { style: { color: '#F00' } }, ' some more text! '),
       ce(Logo, { fill: '#fff', onClick: () => alert('foo') })
      )
  );

  (new Promise(res => {
    if (document.readyState === 'interactive') res()
    else document.addEventListener('DOMContentLoaded', () => res())
  })).then(() => {
    const templates = loadTemplates();
    const main = document.querySelector('main')
    render(tinyel, main)
  })
})
