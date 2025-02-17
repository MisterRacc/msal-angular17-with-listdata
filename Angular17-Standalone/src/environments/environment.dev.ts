export const environment = {
    production: false,
    msalConfig: {
        auth: {
            clientId: '5b600236-888e-47f6-8f69-656adc6eb1c0',
            authority: 'https://login.microsoftonline.com/15c47f9b-e2ad-4b8f-bab6-c6b2eeda8179'
        }
    },
    apiConfig: {
        scopes: ['user.read'],
        uri: 'https://graph.microsoft.com/v1.0/me'
    }
};
