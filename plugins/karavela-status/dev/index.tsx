import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { karavelaStatusPlugin, KaravelaStatusPage } from '../src/plugin';

createDevApp()
  .registerPlugin(karavelaStatusPlugin)
  .addPage({
    element: <KaravelaStatusPage />,
    title: 'Root Page',
    path: '/karavela-status'
  })
  .render();
