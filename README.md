# Node.JS Simple TCP Server Template
Shitty template that i use when i need an TCP server with Node.JS in a few minutes to do something stupid

## Features
1) You don't need to install anything from npm, just download, modify, and run.
2) Basically the same structure of "telnet-chat" repo in my account, but waaay lot better (?
3) Windows and GNU/Linux automatic detection of EOL (not so automatic but its something)

## Bugs
- Nothing by the moment, feel free to open an issue if you found something!

## Usage
- Write your commands under the commandProcessing function, example:

```javascript
function commandProcessing(socket, os) {
      if(message = "PING") {
            socket.write("Pong!" + eol_os);
      }
}
```
- Use "eol_os" variable to add the correct End Of Line to your response if you need it.
- Every command in ```if(socket){...}``` will be executed when a new connection is detected to your server
- The listening port of the server is by default "7532", you can change this modifying the value on ```mainPort``` variable

## License
This script is under the MIT license, you can get more info about the permission by viewing LICENSE file.
Anyway, consider sharing some credit to me if you liked this :D

### PANCHO7532 - P7COMunications LLC
