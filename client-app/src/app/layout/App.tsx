import { useEffect, useState } from 'react'
import './styles.css'
import axios from 'axios';
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'

function App() {
  // state - usestate hook
  // activities - state variable that holds data
  // SetActivities - method to set the state variable
  // [] - initial value of the stat
  const [activities, SetActivities] = useState<Activity[]>([]);

  const [selectedActivity, SetSelectedActivity] = useState<Activity|undefined>(undefined);

  const[editMode,setEditMode] = useState(false);

  //used to implement effect after loading component
  //useEffect hook will be called after loading our component
  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activity")
      .then((response:any) => {
        console.log(response);
        SetActivities(response.data);
      });
  }, []);

  function HandleSelectedActivity(id:string)
  {
     SetSelectedActivity(activities.find(x=>x.id ===id));
     setEditMode(false);
  }

  function HandleCancelActivity()
  {
    SetSelectedActivity(undefined);
  }

  function HandleSetEditMode(value:boolean)
  {
      setEditMode(value);
  }

  function HandleCreateOrEdit(activity:Activity)
  {
      activity.id ? SetActivities([...activities.filter(x=>x.id!==activity.id), activity]) 
                  : SetActivities([...activities,{...activity, id:uuid()}]);
      SetSelectedActivity(activity);
      setEditMode(false);
  }

  function HandleDelete(id:string)
  {
      SetActivities([...activities.filter(x=>x.id !== id)]);
  }

  return (
    <>
      {/* Header, List are semantic-ui react components */}
      {/* <Header as='h2' icon='users' content='My Activities' /> */}
      <NavBar handleSetEditMode={HandleSetEditMode}/>
      <div style={{marginTop:'5em', marginLeft:'5em'}}>
        <ActivityDashboard 
            activities={activities} 
            selectedActivity={selectedActivity} 
            editMode={editMode}
            handleSelectActivity={HandleSelectedActivity}
            handleCancelActivity={HandleCancelActivity}
            handleSetEditMode={HandleSetEditMode}
            handleCreateOrEdit = {HandleCreateOrEdit}
            handleDelete = {HandleDelete}/>
      </div>
    </>
  )
}

export default App
