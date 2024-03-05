import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const karavelaStatusPlugin = createPlugin({
  id: 'karavela-status',
  routes: {
    root: rootRouteRef,
  },
});

export const KaravelaStatusPage = karavelaStatusPlugin.provide(
  createRoutableExtension({
    name: 'KaravelaStatusPage',
    component: () =>
      import('./components/KaravelaStatus').then(m => m.KaravelaStatus),
    mountPoint: rootRouteRef,
  }),
);

export const KaravelaStatusPageSingle = karavelaStatusPlugin.provide(
  createRoutableExtension({
    name: 'KaravelaStatusPageSingle',
    component: () =>
      import('./components/KaravelaStatusSingle').then(m => m.KaravelaStatusSingle),
    mountPoint: rootRouteRef,
  }),
);
