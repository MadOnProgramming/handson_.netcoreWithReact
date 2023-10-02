
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";

interface Props
{
    activities: Activity[];
    handleSelectActivity: (id:string)=>void;
    handleDelete:(id:string)=>void;
}

export default function ActivityList({activities,handleSelectActivity,handleDelete}:Props)
{
    return (
        <Segment>
            <Item.Group divided>
                {activities.map((activity)=>(
                    <Item key={activity.id}>
                        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />              
                        <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city}</div>
                            <div>{activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button onClick={()=>handleSelectActivity(activity.id)} content="View" color="blue" floated="right"></Button>
                            <Button onClick={()=>handleDelete(activity.id)} content="Delete" color="red" floated="right"/>
                            <Label content={activity.category} basic/>
                        </Item.Extra>
                        </Item.Content>
                  </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}