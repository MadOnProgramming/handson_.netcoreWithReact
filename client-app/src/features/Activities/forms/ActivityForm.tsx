import { Button, Form, InputOnChangeData, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { useState } from "react";

interface Props{
    activity:Activity | undefined;
    handleSetEditMode:(value:boolean)=>void;
    handleCreateOrEdit:(activity:Activity)=>void;
}

export default function ActivityForm({activity:selectedActivity,handleSetEditMode,handleCreateOrEdit}:Props)
{
    // Define initial state with an empty activity
    const initialState : Activity = {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        venue: '',
        city: ''
    }

    // Use the selected activity if available
    const[activity,setActivity] = useState(selectedActivity || initialState);

    function handleSubmit()
    {
        console.log(activity);
        handleCreateOrEdit(activity);
    }

    function handleChange(event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)
    {
       const {name,value} =  event.target;
       //... ->its a spread operator to do a shallow copy
       //[name]:value --> dynamic property name during runtime , if dynamic value of [name] is 'title', then it assign
       //the value from value to title property in the activity
       setActivity({...activity,[name]:value});
    }

    return (
        <Segment clearing>
            <Form  onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder="Title" name="title" value={activity.title} onChange={handleChange}/>
                <Form.TextArea placeholder="Description" name="description" value={activity.description} onChange={handleChange}/>
                <Form.Input placeholder="Category" name="category" value={activity.category} onChange={handleChange}/>
                <Form.Input placeholder="Date" name="date" value={activity.date} onChange={handleChange}/>
                <Form.Input placeholder="Venue" name="venue" value={activity.venue} onChange={handleChange}/>
                <Form.Input placeholder="City" name="city" value={activity.city} onChange={handleChange}/>
                <Button floated="right" positive type="submit" content="Submit"/>
                <Button floated="right" type="button" content="cancel" onClick={()=>handleSetEditMode(false)}/>
            </Form>
        </Segment>
    )
}