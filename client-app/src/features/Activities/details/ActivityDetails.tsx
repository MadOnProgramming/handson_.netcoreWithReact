import { Button, Card, Item } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";

interface Props
{    
    selectedActivity: Activity | undefined;
    handleCancelActivity:()=>void;
    handleSetEditMode:(value:boolean)=>void;    
}

export default function ActivityDetails(
  { 
    selectedActivity,
    handleCancelActivity,
    handleSetEditMode
  }: Props) {
    return (
        <Card fluid>
            <Item.Image src={`/assets/categoryImages/${selectedActivity?.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{selectedActivity?.title}</Card.Header>
                <Card.Meta>
                    {selectedActivity?.date}
                </Card.Meta>
                <Card.Description>
                    {selectedActivity?.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button.Group widths={2}>
                <Button basic color="blue" content="Edit" onClick={()=>handleSetEditMode(true)}>
                </Button>
                <Button basic content="Cancel" onClick={handleCancelActivity}>
                </Button>
              </Button.Group>
            </Card.Content>
        </Card>
    )
}