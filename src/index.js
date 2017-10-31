/**
 * author: wemion<angusfu1126@qq.com>
 */
const global = window
const SYMBOL_LIB = '_qha'
const document = global.document
const location = global.location

// assert type
const isFunction = param => typeof param === 'function'

// call function `fn` only once
const callOnlyOnce = fn => {
  let called = false
  return function once () {
    if (called) return
    called = true
    return isFunction(fn) && fn.apply(this, arguments)
  }
}

// insert 360fenxi script
const insertScript = callOnlyOnce(domainId => {
  const protocol = location.protocol === 'https:' ? location.protocol : 'http:'
  const script = document.createElement('script')
  script.defer = true
  script.async = true
  script.src = `${protocol}//s.union.360.cn/${domainId}.js`

  const first = document.getElementsByTagName('script')[0]
  first.parentNode.insertBefore(script, first)
})

// send data
let collect = function (url, domainId) {
  insertScript(domainId)

  collect = (url, domainId) => {
    global[SYMBOL_LIB] = isFunction(global[SYMBOL_LIB]) ? global[SYMBOL_LIB] : function () {
      global[SYMBOL_LIB].c = global[SYMBOL_LIB].c || []
      global[SYMBOL_LIB].c.push(arguments)
    }

    global[SYMBOL_LIB]('set', 'page', url)
    global[SYMBOL_LIB]('send', 'pageview')
  }

  collect(url, domainId)
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
    return router(url => collect(url, domainId))
  }

  if (isFunction(router.afterEach)) {
    return router.afterEach(to => collect(to.fullPath, domainId))
  }

  throw new TypeError('\nParameter `router` is invalid.\nVueRouter instance or function required.')
}
