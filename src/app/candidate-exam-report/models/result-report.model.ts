export class Topics {
    public name : string ;
    public topicTotal : number ;
    public topicCorrect : number ;
    public topicIncorrect : number ; 
    public topicMarks : number ;
    public topicMarksTotal : number ;
}

export class Sections {
    public name : string ;
    public sectionTotal : number ;
    public sectionCorrect : number ;
    public sectionIncorrect : number ; 
    public sectionMarks : number ;
    public sectionMarksTotal : number ;
}

export class PerformanceData {
    public firstName : string ;
    public lastName : string ;
    public gender : string ;
    public email : string ;
    public contact : string ;
    public dob: Date;
    public candid : number ;
    public country : string ;

    public totalQuestions : number ;
    public totalCorrect : number ;
    public totalIncorrect : number ;
    public totalMarks : number ;
    public totalTestMarks : number ;

    public topics : Topics[];
    public sections : Sections[];
}