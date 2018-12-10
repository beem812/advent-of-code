var fs = require('fs');
var StepClass = require('./step');
var StepOperator = require('./stepOperator');
var lineHandler = require('./lineHandler');
var WorkerPool = require('./workerPool');

var lineReader = require('readline').createInterface({
    input: fs.createReadStream('input.txt')
});

var stepOperator = new StepOperator();
var workerPool = new WorkerPool();
var runTime = 0;
lineReader.on('line', (line) => {
    var stepDesignators = lineHandler(line);
    var mainStep = stepOperator.getOrCreateStep(stepDesignators.step);
    var preReqStep = stepOperator.getOrCreateStep(stepDesignators.preReq);
    mainStep.addPreReq(preReqStep);
}).on('close', ()=>  {
    while(stepOperator.steps.size){
        var completeableSteps = stepOperator.getCompleteableSteps();
        workerPool.populateJobs(completeableSteps);
        var stepToComplete = workerPool.getNextJobToComplete();
        runTime += stepToComplete.duration;
        workerPool.decrementJobTimes(stepToComplete.duration);
        var finishedJobs = workerPool.getAndRemoveFinishedJobs();
        finishedJobs.map(step => {
            step.completeStep();
            stepOperator.removeCompletedStep(step.designator);
        })
    }    
    console.log("Total runtime is: " + runTime);
})
