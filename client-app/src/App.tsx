import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  // state - usestate hook
  // activities - state variable that holds data
  // SetActivities - method to set the state variable
  // [] - initial value of the stat
  const [activities, SetActivities] = useState([]);

  //used to implement effect after loading component
  //useEffect hook will be called after loading our component
  useEffect(() => {
    axios.get("http://localhost:5000/api/activity/all")
      .then((response) => {
        console.log(response);
        SetActivities(response.data);
      });
  }, []);

  return (
    <div>
      {/* Header, List are semantic-ui react components */}
      <Header as='h2' icon='users' content='My Activities' />
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default App
