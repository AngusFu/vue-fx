const global = window
const SYMBOL_LIB = '_qha'
const document = global.document
const location = global.location

const isFunction = function (param) {
  return typeof param === 'function'
}

const init = function (domainId) {
  global[SYMBOL_LIB] = isFunction(global[SYMBOL_LIB]) ? global[SYMBOL_LIB] : function () {
    global[SYMBOL_LIB].c = global[SYMBOL_LIB].c || []
    global[SYMBOL_LIB].c.push(arguments)
  }

  global[SYMBOL_LIB].s = 1

  const protocol = location.protocol === 'https:' ? location.protocol : 'http:'
  const script = document.createElement('script')
  script.defer = true
  script.async = true
  script.src = `${protocol}//s.union.360.cn/${domainId}.js`

  const first = document.getElementsByTagName('script')[0]
  first.parentNode.insertBefore(script, first)
}

// send data
const collect = function (url) {
  global[SYMBOL_LIB]('set', 'page', url)
  global[SYMBOL_LIB]('send', 'pageview')
}

export default function (router, domainId) {
  if (!router) {
    throw new TypeError('Invalid parameter `router`: ' + router)
  }

  const isIdValid = Number(domainId) > 0

  if (isIdValid === false) {
    throw new TypeError('Invalid parameter `domainId`: ' + domainId)
  }

  if (isFunction(router)) {
    init(domainId)
    return router(collect)
  }

  if (isFunction(router.afterEach)) {
    init(domainId)
    return router.afterEach(to => collect(to.fullPath))
  }

  throw new TypeError('\nParameter `router` is invalid.\n A VueRouter instance or function is required.')
}
