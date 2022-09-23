---
  title: React-live-chat - Sockets.io
  tech:
    - React
    - Socket.io
    - Redux-toolkit
    - TailwindCSS
    - Vite
    - Express
    - Eslint
    - Prettier
    - CORS
    - Morgan
  description: >-
    Live chat, you can open 2 chats, and have a communication in real-time, white the websockets technoly,
    is a protocol that avoid have this exchange of information more fast for this case.

  liveLink: https://react-chat-socketio-vite.herokuapp.com/
  githubLink: https://github.com/emavi98/React-Chat-online
  image: live-chat.png
  isFeatured: true


---

## Description

Fully functional and fullstack Chat live App.

- Sockets.io for keep the conection.

#### Components

This is the look of the composition of the chat App.

<details>

  <summary>
    <ins>View code</ins>
    <span>
      <i class="fa-solid fa-angle-right"></i>
    </span>
  </summary>

```jsx
const socket = io("", { transports: ["websocket"] });

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
  };

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="text-2xl font-bold my-2">Chat React</h1>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="border-2 border-zinc-5000 p-2 text-black w-full"
        />
        {/* <button className='bg-blue-500'>Send</button> */}

        <ul className="h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`my-2 p-2 table text-sm rounded-md ${
                message.from === "Me" ? "bg-sky-700 ml-auto" : "bg-black"
              }`}
            >
              <p>
                {message.from}: {message.body}
              </p>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
```

</details>
<br />

#### Server

See the how handle the conection in the backend, using CORS, Morgan

<details>

  <summary>
    <ins>View code</ins>
    <span>
      <i class="fa-solid fa-angle-right"></i>
    </span>
  </summary>

```jsx
const app = express();
const __dirname = dirname(
  fileURLToPath(import.meta.url)
); /* dirname("../client/dist") */
console.log(__dirname);
const server = http.createServer(app);
const io = new SocketServer(server);

app.use(cors());
app.use(
  morgan("dev", {
    cors: {
      // origin: 'http://localhost:5173'
    },
  })
);

io.on("connection", (socket) => {
  console.log(socket.id);
  //console.log('a user connected')
  socket.on("message", (message) => {
    socket.broadcast.emit("message", {
      body: message,
      from: socket.id,
    });
  });
});

app.use(express.static(join(__dirname, "../client/dist")));
server.listen(PORT);
console.log("Server started on port", PORT);
```

</details>
