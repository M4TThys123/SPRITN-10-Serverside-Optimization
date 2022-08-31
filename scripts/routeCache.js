const NodeCache = require('node-cache')

const cache = new NodeCache()

modules.exports = duration => (req, res, next) => {
  // is request a GET?
  // if not, call next
  if (req.method !== 'GET') {
    console.error('Cannot cache not-GET methods!')
    return next()
  }
  // check if key exists in cache
  const key = req.originalUrl;
  const cachedResponse = cache.get(key)
  // if it exists, send cache result
  if (cachedResponse) {
    console.log(`Cache hit for ${key}`)
    res.send(cachedResponse)
 } else {
    console.log(`Cache mis for ${key}`)
    res.originalSend = res.send
    res.send = body => {
        res.originalSend(body)
        cache.set(key, body, duration)
    }
    next()
 }
  // if not, replace .send with method to set response to cache
}