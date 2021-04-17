import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [Activities, setActivities] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities/")
    .then(response => {
      setActivities(response.data)
      console.log(response)
    })
  }, [])

  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities"></Header>
      <List>
          {Activities.map((act: any) =>{
            return (
            <List.Item key={act.id}>
              {act.title}
            </List.Item>)
          })}
      </List>
    </div>

  );
}

export default App;
