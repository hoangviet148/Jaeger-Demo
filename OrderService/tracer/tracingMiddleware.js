const opentracing = require("opentracing");
function tracingMiddleWare(req, res, next) {
  const tracer = opentracing.globalTracer();
  // Extracting the tracing headers from the incoming http request
  const wireCtx = tracer.extract(opentracing.FORMAT_HTTP_HEADERS, req.headers);
  // Creating our span with context from incoming request
  const span = tracer.startSpan(req.path, { childOf: wireCtx });

  // Use the log api to capture a log
  span.log({ event: "request_received" });
  const finishSpan = () => {
    span.log({ event: "request_end" });
    span.finish();
  };
  res.on("finish", finishSpan);
  next();
}

module.exports = tracingMiddleWare;
