import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import {NovuProvider, useNotifications, useSocket, useUnseenController, PopoverNotificationCenter, NotificationBell} from '@novu/notification-center';
import { useEffect  } from 'react';


export default function App() {


  return (
      <>
        <StyledBell></StyledBell>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </>
  );
}


function Bell() {
    return (<>
        <StyledIcon>Bell</StyledIcon>

            <NovuProvider subscriberId={'123'} applicationIdentifier={'unZweRJtdhI4'} backendUrl={'https://dev.api.novu.co'} socketUrl={'https://dev.ws.novu.co'}>
                {/*<CustomUI/>*/}
                {/*<NovuProvider subscriberId={'62692ec72aed172a8a00ad6c'} applicationIdentifier={'4N7CXF29R-og'} backendUrl={'http://localhost:3000'}>*/}
                 <PopoverNotificationCenter>
                     {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
                 </PopoverNotificationCenter>
            </NovuProvider>
        </>
    );
}


function CustomUI() {
    const {
        markAsSeen: markNotificationAsSeen,
        fetchNextPage,
        refetch,
        notifications: data,
        fetching: isLoading,
        hasNextPage,
    } = useNotifications();


    const { unseenCount, setUnseenCount } = useUnseenController();
    const { socket } = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('unseen_count_changed', (onData) => {
                if (!isNaN(onData?.unseenCount)) {
                    setUnseenCount(onData.unseenCount);
                    refetch()
                }
            });
        }

        return () => {
            if (socket) {
                socket.off('unseen_count_changed');
            }
        };
    }, [socket]);


    useEffect(() => {

        console.log('data')
        console.log(data)
        console.log('unseenCount ', unseenCount)


    }, [data, unseenCount]);


    return (
        <div> hello world</div>
    );
}


const StyledBell = styled(Bell)`
  display: flex;
  justify-content: right;
  padding: 15px; 
  color : red;
`

const StyledIcon = styled.div`
  display: flex;
  justify-content: right;
  padding: 15px;
  color : red;
`
