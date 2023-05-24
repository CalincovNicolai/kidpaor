export const environment = {
  // @ts-ignore
  production: window['env']?.['prod'] || false,
  useHash: true,
  api: {
    // @ts-ignore
    baseUrl: 'http://localhost:5151/api/',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  },
};
