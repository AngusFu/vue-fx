const LIBNAME = '_qha'
const document = window.document
const location = window.location

export default function (router, domainId) {
  if (!router) {
    throw new TypeError('Invalid parameter `router`: ' + router)
  }

  const isIdValid = Number(domainId) > 0

  if (isIdValid === false) {
    throw new TypeError('Invalid parameter `domainId`: ' + domainId)
  }

  if (isFunction(router)) {
    return router(url => send(url, domainId))
  }

  if (isFunction(router.afterEach)) {
    router.afterEach(to => send(to.fullPath, domainId))
  }

  throw new TypeError('\nParameter `router` is invalid.\nVueRouter instance or function required.')
}

function send (url, domainId) {
  init(domainId)
  window[LIBNAME]('set', 'page', url)
  window[LIBNAME]('send', 'pageview')
}

function init (domainId) {
  if (!window[LIBNAME]) {
    load(domainId)

    window[LIBNAME] = window[LIBNAME] || function () {
      window[LIBNAME].c = window[LIBNAME].c || []
      window[LIBNAME].c.push(arguments)
    }
  }
}

function load (domainId) {
  const script = document.createElement('script')
  script.defer = true
  script.async = true
  script.src = `${location.protocol}//s.union.360.cn/${domainId}.js`

  const first = document.getElementsByTagName('script')[0]
  first.parentNode.insertBefore(script, first)
}

function isFunction (param) {
  return typeof param === 'function'
}
