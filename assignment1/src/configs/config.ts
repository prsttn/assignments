export default () => ({
  saltOrRounds: 10,
  adminPass: process.env.ADMIN_PASS, //'adminPass',
  adminUsername: process.env.ADMIN_USERNAME, //'admin',
  port: parseInt(process.env.PORT, 10) || 3000,
});
