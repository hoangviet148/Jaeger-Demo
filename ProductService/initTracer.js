const serviceName = 'Product Service'
const initTracer = require('jaeger-client').initTracer;

// Sampler set to const 1 to capture every request, do not do this for production
const config = {
    serviceName: serviceName,
    reporter: {
        collectorEndpoint: 'http://localhost:14268/api/traces',
    }
}
let options = {
    tags: {
      'my-awesome-service.version': '1.1.2',
    },
    //metrics: metrics,
    //logger: logger,
  };
// Initialize the Tracer
const tracer = initTracer(config, options)
const opentracing = require('opentracing')
opentracing.initGlobalTracer(tracer)

// Only for DEV the sampler will report every span
// config.sampler = { type: 'const', param: 1 }



