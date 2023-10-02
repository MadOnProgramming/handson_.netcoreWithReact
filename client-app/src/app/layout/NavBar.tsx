import { Button, Container, Menu } from 'semantic-ui-react';

interface Props
{
  handleSetEditMode : (value:boolean)=>void;
}

export default function NavBar({handleSetEditMode}:Props){
    return(
        <Menu inverted fixed='top'>
        <Container>
          <Menu.Item header>
            <img src='./assets/logo.png' alt='logo' style={{marginRight:10}}/>
            ReActivities
          </Menu.Item>
          <Menu.Item name='Activities'>
          </Menu.Item>
          <Menu.Item>
            <Button positive content='Create Activity' onClick={()=>handleSetEditMode(true)}></Button>
          </Menu.Item>
        </Container>
      </Menu>
    );
}