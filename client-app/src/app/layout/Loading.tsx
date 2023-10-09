import { Dimmer, Loader, Segment } from "semantic-ui-react";

interface Props{
    inverted: boolean,
    content: string
}

export default function Loading({content="Loading...",inverted=true}:Props)
{
    return(
            <Dimmer active={true} inverted={inverted}>
                <Loader content={content}/>
            </Dimmer>
    )
}