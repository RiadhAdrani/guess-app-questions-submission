import Answer from "./Answer";

class Question {
     constructor({ statement, topic = "Arts", language = "English", answers, lastModified, id }) {
          this.statment = statement;
          this.topic = topic;
          this.language = language;
          this.answers = answers;
          this.lastModified = lastModified ? lastModified : new Date().getMilliseconds();
          this.id = id;
     }

     clone() {
          return JSON.parse(JSON.stringify(this));
     }

     resetAnswers() {
          const a = [];
          for (let i = 0; i < 10; i++) {
               a.push(new Answer());
          }
          this.answers = a;
     }

     resetAll() {}

     compareTo(question) {
          return JSON.stringify(this) === JSON.stringify(question);
     }
}

export default Question;
