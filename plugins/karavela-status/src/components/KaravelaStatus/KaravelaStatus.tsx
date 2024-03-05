import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { ChangeFetchComponent } from '../ChangeFetchComponent';

export const KaravelaStatus = () => (
  <Page themeId="tool">
    <Header title="Welcome to karavela-status!" subtitle="Aqui você pode acompanhar o stauts de suas requisições =)">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Karavela Requests Status Page">
        <SupportButton>Olá</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <ChangeFetchComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
