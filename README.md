# socketio-webclient
Dead simple web app for communicating with a socket.io server.

## Installation
Requires [Node.js](https://nodejs.org).

1. Clone repository.
2. Get dependencies: ```npm install```
3. Build: ```npm run build```

## Usage
Point your web browser at ```dist/index.html```.

### Inputs
- URL: (Required) The URL of the socket.io endpoint on the server (e.g., ```http://localhost:3000```).
- Event: (Optional) The event to send to the server.
- Data: (Optional) The data payload to send with the event.

When all data has been entered, click the ```Send``` button to initiate a connection, send the event, and then terminate the connection.

### Outputs

The response will be displayed in the lower ```Response``` textarea.

## License
[MIT](LICENSE.md)