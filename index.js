/*
* Base TCP Server for upcoming projects
* (includes command processing)
* Copyright PANCHO7532 - P7COMunications LLC (c) 2019
*
* This script comes with a LICENSE file that you MUST view if you are planning
* to modify this script to your needs.
*/
var net = require('net');
var mainPort = 7532;
var inspect = require("util").inspect; //use inspect(something) for inspect (genius xd)
function commandProcessing(socket, os) {
    if(os == "win") {
        var eol_os = "\r\n";
        var message = socket.incData.substring(0, socket.incData.length-2);
    } else if(os == "gnu") {
        //assuming linux, tbh its the same behaviour
        var eol_os = "\r\n";
        var message = socket.incData.substring(0, socket.incData.length-2);
    } else {
        //04-10-19: well i dont know how it is supposed to reach this point
        //UPDATE: got it :/
        var eol_os = "\n";
        var message = socket.incData.substring(0, socket.incData.length-1);
    }
    /*
    * Here you will be able to make commands
    * USAGE:
    * message variable contains the sent data without the EOL
    * eol_os contains the EOL detected (\r\n for Windows, \n for unix/default sys)
    * 
    * If you will include an text response where you need to insert in a dynamic form an EOL suitable
    * for your clients, you can add eol_os variable to your response.
    */
    if(message == "HELLO") {
        socket.write("Hello world!" + eol_os);
    } else if(message == "QUIT") {
        socket.end();
    }
    return;
}
function parseRemoteAddr(raddr) {
    if(raddr.toString().indexOf("ffff") != -1) {
        //is IPV4 address
        return raddr.substring(7, raddr.length);
    } else {
        return raddr;
    }
}
net.createServer(function(socket){
    //console.log(inspect(socket));
    if(socket) {
        var remoteAddr = parseRemoteAddr(socket.remoteAddress);
        console.log("[INFO] - Connection received at: " + remoteAddr.toString() + " in port " + socket.remotePort);
        socket.incData = ""; //to store incoming content, do not delete
        /*
        * Here you can add startup action commands that will execute when a new client connects to your server
        * FUN FACT: If an TCP Connection doesn't sends text, the written characters are not shown until the server
        * answers something, this, however, happens only in Windows apparently
        */
        socket.write("TCP Server\r\n");
    }
    socket.on('data', function(data) {
        socket.incData += data;
        if(data == "\r\n") {
            //is windows
            //sending command to parsing...
            commandProcessing(socket, "win");
            socket.incData = ""; //cleaning shit
        } else if(data.toString().substring(data.length-2, data.length) == "\r\n") {
            //is unix/linux (?)
            //sending command to parsing...
            commandProcessing(socket, "gnu");
            socket.incData = ""; //cleaning shit
        } else if(data.toString().substring(data.length-1, data.length) == "\n") {
            //detecting only \n, maybe an generic program (?)
            commandProcessing(socket, "generic");
            socket.incData = ""; //cleaning shit... again
        } else {
            //well i dunno whats this
            return;
        }
    });
    socket.on('error', function(error){
        //basic error handling
        console.log("[ERR] - " + error);
    });
}).listen(mainPort);
console.log("[INFO] - Server started at port: " + mainPort);