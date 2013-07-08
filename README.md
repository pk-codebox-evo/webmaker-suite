# Webmaker Suite bootstrap/installation script

Step 1: Clone this repo

Step 2: Run `node install`

Step 3: Go make a coffee, this'll run for a while...

After installation completes, the whole suite can be fired up with `node run`. Note that this will pipe all output from everything into the same console, so this is great for not-looking-at-the-terminal testing, but not a good idea for doing single-component terminal debugging.

## NOTE

Windows users need to install these two things first (in order):

1. Microsoft Visual Studio C++ 2010 Express, http://go.microsoft.com/?linkid=9709949
2. For Windows 7 x64 (which obviously you're on), the Windows 7 64-bit SDK, http://www.microsoft.com/en-us/download/details.aspx?id=8279


## General requirements

* node.js - http://nodejs.org/
* npm - comes with node.js
* python - http://python.org/ (pretty sure we depend on 2.7)
* pip - http://peak.telecommunity.com/dist/ez_setup.py  + "easy_setup pip"
* mongodb - http://www.mongodb.org/downloads
* elastic search - http://www.elasticsearch.org/

### Windows silliness

If you're on windows, MongoDB and Elastic Search require manual installation, which means putting in their own folders and extending your PATH:

#### MongoDB on Windows

Download mongodb as a zipfile, create a `MongoDB` folder for it in your program files folder, and copy `mongo.exe`, `mongod.exe` etc. into it. Then add the MongoDB folder to your PATH variable (in windows 7, that's control panel -> system -> advanced system settings -> environment variables -> system variables section).

#### Elastic Search on Windows

Download elastic search, create a folder `C:\elastisearch` (I am not kidding, ES has the worst restrictions), and unpack the .zip package into it. Elastic Search requires Java, so if you don't have that install, grab the most recent JDK and install it. Then symlink the jdk dir as `c:\java`. Again, I am not joking; ES died on spaces anywhere. To do this, open a `cmd` box with administrative rights, to go `C:\` and type:

`C:\> mklink /D java "c:\Program Files (x86)\Java\jdk1.6.0_17"`

(to remove that at some longer point, use `C:\> unlink java` with admin rights).

Also add `C:\elasticsearch\bin` to your PATH variable.
