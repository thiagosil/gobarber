export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expires_in: '1d',
  },
};
