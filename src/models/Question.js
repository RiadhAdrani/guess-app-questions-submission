import Answer from "./Answer";
import db from "./Firebase";

class Question {
     constructor({
          statement = "",
          topic = "Arts",
          language = "English",
          answers = undefined,
          lastModified,
          id = "randomID",
     }) {
          this.statement = statement;
          this.topic = topic;
          this.language = language;
          this.answers = answers;
          if (!answers) {
               this.resetAnswers();
          }

          this.lastModified = lastModified ? lastModified : new Date().getTime();
          this.id = id;
     }

     toJSON() {
          return {
               statement: this.statement,
               topic: this.topic,
               language: this.language,
               answers: this.answers.map((e) => {
                    return { answer: e.answer, points: e.points };
               }),
               lastModified: this.lastModified,
               id: this.id,
          };
     }

     clone() {
          return JSON.parse(JSON.stringify(this));
     }

     updateLastModified() {
          this.lastModified = new Date().getTime();
     }

     addAnswer() {
          this.answers.push({ answer: "", points: 1 });
     }

     removeAnswer() {
          if (this.answers.length > 10) this.answers.pop();
     }

     resetAnswers() {
          const a = [];
          for (let i = 0; i < 10; i++) {
               a.push(new Answer({ answer: "", points: 1 }));
          }
          this.answers = a;
     }

     resetStatement() {
          this.statement = "";
     }

     resetAll() {
          this.statement = "";
          this.topic = "Arts";
          this.language = "English";
          this.resetAnswers();
     }

     compareTo(question) {
          if (this.statement.trim() !== question.statement.trim()) return false;

          if (this.language !== question.language) return false;

          if (this.topic !== question.topic) return false;

          if (this.answers.length !== question.answers.length) return false;

          for (let e = 0; e < this.answers.length; e++) {
               if (this.answers[e].answer.trim() !== question.answers[e].answer.trim())
                    return false;
               if (this.answers[e].points !== question.answers[e].points) return false;
          }

          return true;
     }

     submit({ onSuccess = () => {}, onFailure = () => {} }) {
          db.collection("questions")
               .add(this.toJSON())
               .then(() => {
                    onSuccess();
               })
               .catch((e) => {
                    onFailure(e);
               });
     }

     save({ onSuccess = () => {}, onFailure = () => {} }) {
          this.updateLastModified();
          db.collection("questions")
               .doc(this.id)
               .update(this.toJSON())
               .then(() => {
                    onSuccess();
               })
               .catch((e) => {
                    onFailure(e);
               });
     }

     prepare() {
          this.statement.trim();

          if (this.statement.indexOf("10") === 0) {
               this.statement = this.statement.substr(2);
          }

          for (let e in this.answers) {
               this.answers[e].answer.trim();
          }
     }

     verify(list) {
          if (this.statement.trim().length < 3) {
               return Question.SHORT_STATEMENT;
          }

          for (let a in this.answers) {
               const ans = this.answers[a];
               if (ans.answer.trim().length < 2) {
                    return Question.SHORT_ANSWER;
               }
               for (let b in this.answers) {
                    const ansb = this.answers[b];
                    if (b !== a && ans.answer.trim() === ansb.answer.trim()) {
                         return Question.DUPLICATE_ANSWER;
                    }
               }
          }

          for (let e; e < list.length; e++) {
               if (this.statement.trim() === list[e].statement.trim() && this.id !== list[e].id) {
                    return Question.DUPLICATE;
               }
          }

          return Question.GOOD;
     }

     onVerify({
          list = [],
          onDuplicateQuestion = () => {},
          onShortQuestionStatement = () => {},
          onShortAnswer = () => {},
          onDuplicateAnswer = () => {},
          onValidSubmission = () => {},
     }) {
          switch (this.verify(list)) {
               case Question.DUPLICATE:
                    onDuplicateQuestion();
                    return;
               case Question.SHORT_STATEMENT:
                    onShortQuestionStatement();
                    return;
               case Question.SHORT_ANSWER:
                    onShortAnswer();
                    return;
               case Question.DUPLICATE_ANSWER:
                    onDuplicateAnswer();
                    return;
               case Question.GOOD:
                    onValidSubmission();
                    return;
          }
     }

     static getQuestionIndexByID(id, list) {
          for (let e; e < list.length; e++) {
               if (id === list[e].id) {
                    return e;
               }
          }

          return -1;
     }

     static fromJSON(json) {
          return new Question({
               statement: json.statement ? json.statement : "",
               topic: json.topic ? json.topic : "Arts",
               language: json.language ? json.language : "English",
               lastModified: json.lastModified ? json.lastModified : new Date().getTime(),
               answers: json.answers
                    ? json.answers.map((e) => {
                           return new Answer({ answer: e.answer, points: e.points });
                      })
                    : [],
               id: json.id ? json.id : "RandomID",
          });
     }

     static DUPLICATE = "DUPLICATE";
     static SHORT_STATEMENT = "SHORT_STATEMENT";
     static SHORT_ANSWER = "SHORT_ANSWER";
     static DUPLICATE_ANSWER = "DUPLICATE_ANSWER";
     static GOOD = "GOOD";
}

export default Question;
