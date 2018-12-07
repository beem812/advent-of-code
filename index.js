var fs = require('fs');
var StepClass = require('./step');
var StepOperator = require('./stepOperator');
var lineHandler = require('./lineHandler');

var lineReader = require('readline').createInterface({
    input: fs.createReadStream('input.txt')
});

var stepOperator = new StepOperator();

lineReader.on('line', (line) => {
    var stepDesignators = lineHandler(line);
    var mainStep = stepOperator.getOrCreateStep(stepDesignators.step);
    var preReqStep = stepOperator.getOrCreateStep(stepDesignators.preReq);
    mainStep.addPreReq(preReqStep);
}).on('close', ()=>  {
    while(stepOperator.steps.size){
        var completeableSteps = stepOperator.getCompleteableSteps();
        console.log("completed: " + completeableSteps[0].designator);
        completeableSteps[0].completeStep();
        stepOperator.removeCompletedStep(completeableSteps[0].designator);
    }    
})
