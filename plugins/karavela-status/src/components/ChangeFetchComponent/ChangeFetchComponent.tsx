import React, { useState, useEffect } from 'react';
import { Table, TableColumn } from '@backstage/core-components';
import { Link } from 'react-router-dom';

type PullRequest = {
  url: string;
}

type Change = {
  id: string;
  requester: string;
  completed: boolean;
  status: string;
  owner: string;
  needs_approval: boolean;
  approved: boolean;
  pull_requests: Array<PullRequest>;
};

type DenseTableProps = {
  changes: Change[];
  onRowClick: (event?: React.MouseEvent<Element, MouseEvent>, rowData?: Change | undefined, toggleDetailPanel?: ((panelIndex?: number | undefined) => void) | undefined) => void;
};


export const DenseTable = ({ changes, onRowClick }: DenseTableProps) => {
  const columns: TableColumn<Change>[] = [
    { title: 'Id', field: 'id', render: rowData => <Link to={`/karavela-status/${rowData.id}`}>{rowData.id}</Link> }, 
    { title: 'Requester', field: 'requester' },
    { title: 'Owner', field: 'owner' },
    { title: 'Status', field: 'status' },
  ];

  const data = changes.map(change => {
    const changeData: Change = {
      id: change.id,
      requester: change.requester,
      owner: change.owner,
      status: change.status,
      completed: change.completed,
      approved: change.approved,
      needs_approval: change.needs_approval,
      pull_requests: change.pull_requests
    }
    return changeData
  });

  return (
    <Table
      title="Changes"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
      onRowClick={onRowClick}
      detailPanel={[
        {
          tooltip: 'Expand',
          render: ({rowData}) => {
            return (
              <div>
              <h4>Pull Requests:</h4>
              <ul>
                {rowData.pull_requests && rowData.pull_requests.map((pullRequest, index) => (
                  <li key={index}>
                    {pullRequest.url}
                  </li>
                ))}
              </ul>
            </div>
            ) 
          }
        }
      ]}
    />
  );
};

export const ChangeFetchComponent = () => {
  const [changes, setChanges] = useState([]);
  const [_, setSelectedChange] = useState<Change | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/changes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setChanges(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData()
  }, [])

  const handleRowClick = (event?: React.MouseEvent<Element, MouseEvent>, rowData?: Change | undefined, toggleDetailPanel?: ((panelIndex?: number | undefined) => void) | undefined) => {
    if (rowData) {
      setSelectedChange(rowData);
    }
  };

  return (
    <DenseTable changes={changes || []} onRowClick={handleRowClick}/>
  );
};
