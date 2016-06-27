/* global define */

define('tinyAct', [], () => {
  const { assign } = Object;

  /**
   * Minimal wrap around document.createElement, so we can have children
   */
  function createElement(tag, attrs, ...children) {
    const el = assign(document.createElement(tag), attrs)

    for (let child of children) {
      if (['string', 'number'].includes(typeof child)) {
        el.appendChild(document.createTextNode(child))
      } else {
        el.appendChild(child)
      }
    }

    return el
  }

  return {
    createElement,
  }
});
