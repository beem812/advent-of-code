module.exports = function(line){
    captureGroups = /Step ([A-Z]).+step ([A-Z])/.exec(line);
    return{
        preReq: captureGroups[1],
        step: captureGroups[2]
    }
}