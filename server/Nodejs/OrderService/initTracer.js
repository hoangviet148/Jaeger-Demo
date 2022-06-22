const serviceName = 'Order Service'
console.log("order")

// Initialize the Tracer
const tracer = initTracer(serviceName)
const opentracing = require('opentracing')
opentracing.initGlobalTracer(tracer)

function initTracer(serviceName) {
    const initJaegerTracer = require('jaeger-client').initTracerFromEnv

    // Sampler set to const 1 to capture every request, do not do this for production
    const config = {
        serviceName: serviceName
    }
    // Only for DEV the sampler will report every span
    config.sampler = { type: 'const', param: 1 }

    return initJaegerTracer(config)
}