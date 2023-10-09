import { useEffect, useState } from 'react'
import './styles.css'
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'
import agent from '../api/agent';
import Loading from './Loading';

function App() {
  // state - usestate hook
  // activities - state variable that holds data
  // SetActivities - method to set the state variable
  // [] - initial value of the stat
  const [activities, SetActivities] = useState<Activity[]>([]);

  const [selectedActivity, SetSelectedActivity] = useState<Activity|undefined>(undefined);

  const[editMode,setEditMode] = useState(false);

  const[loading,setLoading]= useState(true);

  const[submitting,setSubmitting] = useState(false);

  //used to implement effect after loading component
  //useEffect hook will be called after loading our component
  useEffect(() => {      
      agent.Activities.List().then((data)=>{
        data.forEach(activity=>{
          activity.date = activity.date.split('T')[0];
        })
        SetActivities(data);
        setLoading(false);
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
    setSubmitting (true);    
    if(activity.id)
    {
      
      //edit
      agent.Activities.Update(activity).then(()=>{
        SetActivities([...activities.filter(x=>x.id!==activity.id), activity]);
        SetSelectedActivity(activity);
        setEditMode(false);
        setSubmitting (false);
      });      
    }
    else
    {      
      //create      
      activity.id = uuid();
      agent.Activities.Create(activity).then(()=>{
        SetActivities([...activities,activity])
        SetSelectedActivity(activity);
        setEditMode(false);
        setSubmitting (false);
      });      
    }    
  }

  function HandleDelete(id:string)
  {
      SetActivities([...activities.filter(x=>x.id !== id)]);
      SetSelectedActivity(undefined);
  }  

  return (
    <>
      {/* Header, List are semantic-ui react components */}
      {/* <Header as='h2' icon='users' content='My Activities' /> */}      
      <NavBar handleSetEditMode={HandleSetEditMode}/>                        
      {loading &&
        <Loading inverted={true} content='Loading...'/>}
      <div style={{marginTop:'5em', marginLeft:'5em'}}>
        <ActivityDashboard 
            activities={activities} 
            selectedActivity={selectedActivity} 
            editMode={editMode}
            submitting={submitting}
            handleSelectActivity={HandleSelectedActivity}
            handleCancelActivity={HandleCancelActivity}
            handleSetEditMode={HandleSetEditMode}
            handleCreateOrEdit = {HandleCreateOrEdit}
            handleDelete = {HandleDelete}
            />
      </div>
    </>
  )
}

export default App
