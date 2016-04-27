const env = process.env.NODE_ENV;

export default {
  production: "production" === env,
  development: "development" === env,
  test: "test" === env
}
