module.exports = class WorkerPool {
    constructor(){
        this.activeJobs = [];
    }
    
    populateJobs(steps){
        var stepsToAdd = 5 - this.activeJobs.length
        stepsToAdd = stepsToAdd > steps.length? steps.length : steps.length
        
        for(var i = 0; i < stepsToAdd; i++){
            if(! this.activeJobs.find(step => step.designator === steps[i].designator))
                this.activeJobs.push(steps[i]);
        }
    }

    getNextJobToComplete(){
        return this.activeJobs.sort((step1, step2) => {
            return step1.duration - step2.duration;
        })[0];
    }

    decrementJobTimes(duration){
        this.activeJobs.forEach((step) => {
            console.log("step designator: " + step.designator +" duration: "+step.duration)
            step.duration -= duration;
        });
    }

    getAndRemoveFinishedJobs(){
        var finishedJobs = this.activeJobs.filter(step => {
            return step.duration === 0;
        });
        this.activeJobs = this.activeJobs.filter(step => {
            return step.duration !== 0;
        });
        return finishedJobs;
    }

}