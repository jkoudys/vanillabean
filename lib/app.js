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

  function require(dependencies, definition) {
    Promise.all(dependencies.map(getDependencyPromise)).then(result => definition(...result))
  }

  function define() {
    const [id, dependencies, factory] = (arguments.length > 2) ? arguments : [arguments[1].name, ...arguments]

    console.log(id);
    require(dependencies, (...args) => resolve(id, factory(...args)))
  }
  define.amd = true;

  define('require', [], require);

  Object.assign(window, { define, require });
}

for (let src of [
  'https://fb.me/react-with-addons-15.1.0.js',
  'https://fb.me/react-dom-15.1.0.js',
  './index.js',
  './loadTemplates.js',
  './tinyAct.js',
]) document.head.appendChild(Object.assign(document.createElement('script'), { src }))
