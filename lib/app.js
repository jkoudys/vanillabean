// Our AMD
{
  const promises = {}
  const resolves = {}

  function getDependencyPromise(name) {
    if (!promises[name]) promises[name] = new Promise(res => { resolves[name] = res })
    return promises[name]
  }

  function resolve(name, value) {
    getDependencyPromise(name)
    resolves[name](value)
    delete resolves[name]
  }

  Object.assign(window, {
    define(id, dependencies, factory) { require(dependencies, (...args) => resolve(id, factory(...args))) },

    require(dependencies, definition) {
      Promise.all(dependencies.map(getDependencyPromise)).then(result => definition(...result))
    },
  });
}

for (let src of [
  './loadTemplates.js',
]) {
  document.head.appendChild(Object.assign(document.createElement('script'), { src }))
}

require(['loadTemplates'], loadTemplates => {
  const articles = [{
    title: 'A great article',
    text: 'Something about why this article is great.',
  }, {
    title: 'A lesser article',
    text: 'This is still pretty good. As great as the best article? No. But good.',
  }, {
    title: 'Some other article',
    text: 'Normally we\'d grab these from a web service, eh?',
  }]

  document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main')

    const templates = loadTemplates();
    main.innerHTML = articles.reduce((s, ob) => s + templates.article(ob), '')
  })
})
