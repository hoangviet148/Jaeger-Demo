const  serviceName = "Product Service"

function initTracer(serviceName) {
  const initJaegerTracer = require("jaeger-client").initTracer;

  const config = {
    // Sampler set to const 1 to capture every request, do not do this for production
    serviceName: serviceName,
    reporter: {
      collectorEndpoint: "http://jaeger-collector:14268/api/traces",
    },
  };
  // Only for DEV the sampler will report every span
  config.sampler = { type: "const", param: 1 };
  return initJaegerTracer(config);
}

const tracer = initTracer(serviceName)
const opentracing = require('opentracing')
opentracing.initGlobalTracer(tracer)