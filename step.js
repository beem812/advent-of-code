
module.exports = class Step {
    constructor(designator){
        this.designator = designator;
        this.isComplete = false
        this.preRequisites = new Map();
        this.duration = designator.charCodeAt(0) - 'A'.charCodeAt(0) + 61; 
    }

    addPreReq(step){
        this.preRequisites.set(step.designator, step);
    }

    incompletePreReqs(){
        return [...this.preRequisites].filter(([k, v]) => {
            return !v.isComplete;
        }).length;
    }

    completeStep(){
        this.isComplete = true;
    }

}