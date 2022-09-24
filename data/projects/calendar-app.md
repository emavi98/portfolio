---
  title: Calendar App
  tech:
    - React
    - Redux
    - MongoDB
    - Node
    - Express
    - Bootstrap
    - Vite
  description: >-
    Fullstack Calendar App with login using the MERN stack and Redux,
    deploy in Heroku, can see an test the demo, there are a Login Page,
    en Register Page, authentication is done through JWT json web token,
    also use bcrypt for send the encrypted info, JWT have also the payload encrypt.

  liveLink: https://mern-calendar-emanuel.herokuapp.com/
  githubLink: https://github.com/emavi98/Calendar-app-MERN-Stack
  image: calendar-app.PNG
  isFeatured: true
  screenshots:
    - screenshot: login.PNG
      description: Login and Register  in the same page.
    - screenshot: calendar-app.PNG
      description: Navbar component, Fab icons (add+ , delete-), react-big-calendar.
    - screenshot: date-picker.PNG
      description: into the react-modal component, there are handle date-picker component.
    - screenshot: modal.PNG
      description: modal popup from fab icon.

---

## Description

Fully functional and fullstack calendar App.

- Includes Login page for Auth, React-big-calendar- React-date-picker- Middlewares- Form Auth
- Authentication handled with JWT.
- Redux for state management.
- MongoDB

## Key takeaways

This is a complex project both in the backend and frontend.
Besides all route and controller logic with authentication, CRUD
and so on in the backend, my main takeaway for this project is the
state management with Redux in the frontend which is depicted in the diagram below.

#### Store

Combines all reducers and apply async-await fuction in replace of Thunks (middleware that allows
you to return functions).

<details>

  <summary>
    <ins>View code</ins>
    <span>
      <i class="fa-solid fa-angle-right"></i>
    </span>
  </summary>

```js
export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: [
      //tempEvent
    ],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },

    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      //state.events = payload;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      (state.isLoadingEvents = true), (state.events = []);
      state.activeEvent = null;
    },
  },
});

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;
```

</details>
<br />

#### Components

This is the look of the composition of the calendar App.

<details>

  <summary>
    <ins>View code</ins>
    <span>
      <i class="fa-solid fa-angle-right"></i>
    </span>
  </summary>

```jsx
export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUiStore ();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const[lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    //console.log(event);

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user._id);

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
   // console.log( {doubleClick: event });
   openDateModal();
  }

  const onSelect = ( event ) => {
    //console.log( {click: event });
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event );
    setLastView( event )
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])

  return (
    <>
      <Navbar />

      <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      formats
      defaultView= { lastView }
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px )' }}
      messages={ getMessagesES() }
      eventPropGetter= { eventStyleGetter }
      components= {{
        event: CalendarEvent
      }}
      onDoubleClickEvent = { onDoubleClick }
      onSelectEvent = { onSelect}
      onView = {onViewChanged}

    />

    <CalendarModal />
    <FabAddNew />
    <FabDelete />

    </>
  )
```

</details>
<br />

#### Server

The heart of the backend application. Connects to the DB via
config/db and uses all routes made available by routes  
and error handling directly from the
middleware.

#### Config/db

Makes the connection to the database.

#### Routes

Best regarded as Endpoints. Route methods (get, post, put,
delete) are defined for the specified route and used in
conjunction with a controller and middleware functions, which
hold the logic. (e.g. router.post(&apos;/login&apos;,
authUser))

#### Controllers

Best regarded as the application logic. The functions defined
here will be requested when hitting the defined
routes/endpoints. It is the place where the logic for a given
route is applied.

#### Models

Defines the DB schema for a given model. also
uses bcrypt to compare and hash passwords.
