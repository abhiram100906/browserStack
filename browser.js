const open = require('open')
var ps = require('ps-node');

var browser = {}; 

browser.open = async function(browser, url ) {

    // Opens the url in the default browser
    //await open(url) 
    let appName = '';
    //await open('https://sindresorhus.com');
    url = "https://" + url;
    console.log(browser);
    if(browser.toLowerCase() === 'chrome'){
        appName = 'google chrome';
    }
    if(browser.toLowerCase() === 'firefox'){
        appName = 'firefox';
    }

    console.log(`Opening ${appName} with ${url}`);

    await open(url, {app: {name: appName}});    
}

browser.stop = function(browser){
    ps.lookup({
        command: 'firefox',
        //psargs: 'ux'
        }, function(err, resultList ) {
        if (err) {
            throw new Error( err );
        }
     
        resultList.forEach(function( process ){
            if( process ){
                console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
            }
        });
    });
    //this.isProcessRunning(browser);

}

/**
 * 
 * @param {string} processName The executable name to check
 * @returns {boolean} True: Process running, else false
 */
 browser.isProcessRunning = function(processName){
    const cmd = (()=>{
        switch (process.platform) {
            case 'win32' : return `tasklist`;
            case 'darwin' : return `ps -ax | grep ${processName}`;
            case 'linux' : return `ps -A`;
            default: return false;
        }
    })();
    require('child_process').exec(cmd, (err, stdout, stderr) => {
        console.log(stdout.toLowerCase().indexOf(processName.toLowerCase()) > -1);
    });
}

browser.cleanup = function(browser){
    //TODO
}

browser.geturl = function(browser){
    
}



//export the module
module.exports = browser;