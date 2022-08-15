export default () => ({
  connectionURL: `mongodb://${process.env.DATABASE_HOST}/${process.env.DATABASE_Name}`,
});
