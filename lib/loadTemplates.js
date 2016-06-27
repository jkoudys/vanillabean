/* global define */

define('loadTemplates', [], () => {
  // Obj of our loaded templates
  const templates = {}

  return () => {
    // Get our templates
    for (let template of document.querySelectorAll('script[type="text/template"]')) {
      templates[template.dataset.template] = new Function('t', `return \`${template.textContent}\``)
    }

    return templates
  }
})
