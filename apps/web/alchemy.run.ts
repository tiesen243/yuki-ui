import alchemy from 'alchemy'
import { Nextjs } from 'alchemy/cloudflare'
import { GitHubComment } from 'alchemy/github'

const startTime = performance.now()

const app = await alchemy('yuki-ui')

export const web = await Nextjs('web', {
  bundle: {
    loader: {
      '.bin': 'file',
    },
  },
})

console.log(`
> Web    -> ${web.url}
`)

if (process.env.PULL_REQUEST) {
  await GitHubComment('pr-preview-comment', {
    owner: process.env.GITHUB_REPOSITORY_OWNER ?? 'your-username',
    repository: process.env.GITHUB_REPOSITORY_NAME ?? 'my-app',
    issueNumber: Number(process.env.PULL_REQUEST),
    body: `
## Preview Environment Deployed

Your preview environment has been successfully built and deployed!

### Service Endpoints

| Service | Endpoint / Reference |
|---------|----------------------|
| **Web** | ${web.url} |

<details>
<summary><b>Deployment Details</b></summary>

- **Build Commit:** ${process.env.GITHUB_SHA}
- **Build Time:** \`${((performance.now() - startTime) / 1000).toFixed(2)}s\`
- **Deployed At:** ${new Date().toUTCString()}
</details>

---
<sub>🤖 *Automatically generated. This comment will be updated when you push new commits to this PR.*</sub>`,
  })
}

await app.finalize()
