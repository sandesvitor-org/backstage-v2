import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { Config } from '@backstage/config';
import axios from 'axios'

type Offer = {
  id: number;
  owner: string;
  needs_approval: boolean;
};

export const orchestratorAction = (config: Config) => {
    return createTemplateAction<{ 
      offer: string; 
      email: string; 
      pullRequests: string[]; 
    }>({
      id: 'stone:change:create',
      schema: {
        input: {
          required: ['email', 'offer', 'pullRequests'],
          type: 'object',
          properties: {
            email: {
              type: 'string',
              title: '',
              description: 'O tipo da oferta',
            },
            offer: {
              type: 'string',
              title: '',
              description: 'O tipo da oferta',
            },
            pullRequests: {
              type: 'array',
              title: '',
              description: 'Lista dos PRs a serem aprovados e mergeados',
              items: {
                type: 'object',
                properties: {
                  url: {
                    type: 'string'
                  },
                  targetPath: {
                    type: 'string'
                  }
                }
              }
            }
          },
        },
      },
      async handler(ctx) {
        const pull_requests = ctx.input.pullRequests
        const requester = ctx.input.email
        const offer = ctx.input.offer
        
        const changeApiUrl = config.getString(`orchestrator.changeApi.url`)
        const offersApiUrl = config.getString(`orchestrator.offersApi.url`)
        
        const offersResponse = await axios.get(`${offersApiUrl}/${offer}`)

        const offersData: Offer = offersResponse.data

        const data = {
          requester: requester,
          owner: offersData.owner,
          needs_approval: offersData.needs_approval,
          pull_requests: pull_requests,
          approved: false
        }

        await axios({
          method: 'post',
          url: changeApiUrl,
          headers: {}, 
          data: data
        });
      },
    });
};
