export const environment = {
  // @ts-ignore
  production: window['env']?.['prod'] || false,
  useHash: true,
  api: {
    // @ts-ignore
    baseUrl: 'https://localhost:7275/api/',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  },
};
