# socketio-webclient
Dead simple web app for communicating with a socket.io server.

## Installation
1. Clone repository.
2. Get dependencies: ```npm install```
3. Change the ```build``` script in ```package.json``` to point to ```bash``` on your system.
4. Run the ```build``` script, which will put the built app in the ```dist``` directory.

## Usage
Point your web browser at ```dist/index.html```.

### Inputs
- URL: (Required) The URL of the socket.io endpoint on the server (e.g., ```http://localhost:3000```).
- Event: (Required) The event to send to the server.
- Data: (Optional) The data payload to send with the event.

When all data has been entered, click the ```Send``` button to initiate a connection, send the event, and then terminate the connection.

The response will be displayed in the lower textarea.

## License
[MIT](LICENSE.md)