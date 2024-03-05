import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

// type People = {
//   id: number;
//   email: string;
//   team_id: boolean;
//   team_name: string;
//   cost_center: string;
//   position: boolean;
//   member_of: Array<string>;
// };

export const ChangeFetchSingleComponent = () => {
  const [change, setChange] = useState<Change | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const changeResponse = await fetch(`http://localhost:8080/api/v1/changes/${id}`);
        if (!changeResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const changeData: Change = await changeResponse.json();
        setChange(changeData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData()
  }, [])


  const handleApproveChange = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/changes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved: true }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setChange(prevChange => prevChange ? { ...prevChange, approved: true } : null);
    } catch (error) {
      console.error('Error approving change:', error);
    }
  };

  return (
    <div>
      <h1>Change ID [{change?.id}] </h1>
      <p>Requester: [{change?.requester}]</p>
      <p>Status:    [{change?.status}]</p>
      <p>Approved:  [{change?.approved}]</p>
      <button onClick={handleApproveChange}>You may Approve Change</button>
    </div>
  );
};
