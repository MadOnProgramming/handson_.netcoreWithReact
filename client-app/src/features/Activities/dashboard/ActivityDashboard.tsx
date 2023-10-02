import { Grid} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../forms/ActivityForm";
import { Activity } from "../../../app/models/Activity";
import { useState } from "react";

interface Props
{
    activities: Activity[];
    selectedActivity: Activity | undefined;
    editMode:boolean;
    handleSelectActivity: (id:string)=>void;
    handleCancelActivity:()=>void;
    handleSetEditMode:(value:boolean)=>void;
    handleCreateOrEdit:(activity:Activity)=>void;
    handleDelete:(id:string)=>void;
}

export default function ActivityDashboard(
    {
        activities,
        selectedActivity,
        editMode,
        handleSelectActivity,
        handleCancelActivity,        
        handleSetEditMode,
        handleCreateOrEdit,
        handleDelete
    }:Props)
{    

    return (
            <Grid>
                <Grid.Column width='10'>
                    <ActivityList activities={activities} handleSelectActivity={handleSelectActivity} handleDelete= {handleDelete} />
                </Grid.Column>
                <Grid.Column width='4'>
                    {selectedActivity && !editMode &&
                    <ActivityDetails 
                        selectedActivity={selectedActivity} 
                        handleCancelActivity={handleCancelActivity}
                        handleSetEditMode={handleSetEditMode}/>} 
                    {editMode && <ActivityForm activity={selectedActivity} handleSetEditMode={handleSetEditMode} handleCreateOrEdit = {handleCreateOrEdit}/>}                    
                </Grid.Column>                
            </Grid>
    )
}