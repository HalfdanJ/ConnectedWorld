# Connected World
This is an experimental application made in [Node.js](http://nodejs.org) and [D3](http://d3js.org). The idea behind the application is to visualize how your computer is connected to the world constantly, and how its communicating with computers all over the world. The application listens to all network packages going in and out of your computer (without looking at the content) and determines where they go to (based on the IP address). It  will then display a marker and line on the map if it can find a geographic location for the IP address in realtime. 

I find that there is something facinating with the fact that my computer with a touch on my keyboard can talk to a place on Greenland, South Africa or Colombia, the fact that a machine a remote place from me actually does work for me.

The result looks like this

![Image](https://raw.githubusercontent.com/HalfdanJ/ConnectedWorld/master/screenshot.png)



## Install it
- Install Node.js (if you dont have it)
- Clone this repository to somewhere that makes sense 
  - `git clone https://github.com/HalfdanJ/ConnectedWorld.git`
- Go to the folder 
  - `cd ConnectedWorld`
- Install 
  - `npm install`

## Run it 
- Run (needs to be sudo to sniff packages)
  - `sudo node app`
- Open [localhost:3000](http://localhost:3000) 


### Boring stuff
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dct:title" rel="dct:type">Connected World</span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">Jonas Jongejan</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
