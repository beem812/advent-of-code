var StepClass = require('./step');

module.exports = class StepOperator{
    constructor(){
        this.steps = new Map();
    }

    getOrCreateStep(designator){
        var step = this.steps.get(designator);
        if(!step){
            step = new StepClass(designator);
            this.addStep(step);
        }
        return step;
    }

    addStep(step){
        this.steps.set(step.designator, step);
    }

    getCompleteableSteps(){
        var completeables = [...this.steps].filter(([k, v]) => {
            return v.incompletePreReqs() === 0;
        });
        completeables = completeables.map(([k,v]) => {
            return v;
        }).sort((a, b) => {
            return a.designator < b.designator ? -1 : 1;
        });
        return completeables;
    }

    removeCompletedStep(designator){
        this.steps.delete(designator);
    }
}