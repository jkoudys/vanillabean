define('toggle', ['react', 'styles'], ({ Component, createElement: ce }, STYLES) => {
  const { assign, create } = Object

  function Toggle(props) {
    Component.call(this, props)
    assign(this, {
      state: {
        toggled: false,
      },
      handleClick: ev => {
        ev.preventDefault()
        console.log('click')
        this.setState({ toggled: !this.state.toggled })
      },
    })
  }
  Toggle.prototype = assign(create(Component.prototype), {
    render() {
      const { toggled } = this.state
      return (
        ce('a', {
          onClick: this.handleClick,
          href: '#',
          style: assign({}, STYLES.button, {
            backgroundColor: toggled ? 'red' : 'blue'
          }),
        }, 'Go!')
      )
    },
  })

  return Toggle
})
