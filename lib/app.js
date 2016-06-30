// Our AMD
{
  const modules = {
    react: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react',
    'react-dom': 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom',
    index: './index',
    loadTemplates: './loadTemplates',
    tinyAct: './tinyAct',
    toggle: './components/Toggle',
    logo: './components/Logo',
    styles: './styles'
  }

  const promises = {}
  const resolves = {}

  const pendingDefines = []

  Object.keys(modules).forEach(id => {
    document.head.appendChild(Object.assign(document.createElement('script'), {
      src: modules[id] + '.js',
      onload: () => {
        for (let pendingDefine; pendingDefine = pendingDefines.pop();) {
          define(id, ...pendingDefine)
        }
      },
    }))
  })

  function getDependencyPromise(name) {
    if (!promises[name]) promises[name] = new Promise(res => { resolves[name] = res })
    return promises[name]
  }

  function resolve(name, value) {
    getDependencyPromise(name)
    resolves[name](value)
    delete resolves[name]
  }

  function require(dependencies = [], definition = () => {}) {
    Promise.all(dependencies.map(getDependencyPromise)).then(result => definition(...result))
  }

  function define() {
    // Check for optional params)
    if (arguments.length < 3) {
      pendingDefines.push(arguments)
    } else {
      const [id, dependencies, factory] = arguments
      require(dependencies, (...args) => resolve(id, factory(...args)))
    }
  }
  define.amd = true;

  define('require', [], require);

  Object.assign(window, { define, require });
}
