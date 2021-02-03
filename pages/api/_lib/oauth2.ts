import simpleOauthModule from 'simple-oauth2'

export const create = () =>
  simpleOauthModule.create({
    client: {
      id: process.env.OAUTH_CLIENT_ID || '',
      secret: process.env.OAUTH_CLIENT_SECRET || '',
    },
    auth: {
      tokenHost: `https://github.com`,
      tokenPath: `/login/oauth/access_token`,
      authorizePath: `/login/oauth/authorize`,
    },
  })

type RenderBody = {
  (status: 'success', content: { token: string; provider: 'github' }): string
  (status: 'error', content: any): string
}

export const renderBody: RenderBody = (status: string, content: any) => `
<script>
  const receiveMessage = (message) => {
    window.opener.postMessage(
      'authorization:github:${status}:${JSON.stringify(content)}',
      message.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);

  window.opener.postMessage("authorizing:github", "*");
</script>
`
