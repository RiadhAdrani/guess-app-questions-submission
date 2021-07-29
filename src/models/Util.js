import db from "./Firebase";
import Question from "./Question";
import Answer from "./Answer";

class Utils {
     static getParams({ onSuccess }) {
          db.collection("param")
               .doc("params")
               .onSnapshot((snapshot) => {
                    onSuccess(snapshot.data());
               });
     }

     static getQuestionsList({ onSuccess }) {
          db.collection("questions").onSnapshot((res) => {
               const list = [];

               res.docs.forEach((e) => {
                    list.push(
                         new Question({
                              statement: e.data().statement,
                              topic: e.data().topic,
                              language: e.data().language,
                              answers: e.data().answers.map(
                                   (e) =>
                                        new Answer({
                                             answer: e.answer,
                                             points: e.points,
                                        })
                              ),
                              lastModified: e.data().lastModified,
                              id: e.id,
                         })
                    );
               });

               onSuccess(list);
          });
     }

     static deletQuestion({ id, onSuccess = () => {}, onFailure = () => {} }) {
          db.collection("questions")
               .doc(id)
               .delete()
               .then(() => {
                    onSuccess();
               })
               .catch((e) => {
                    onFailure(e);
               });
     }

     static getUsers({ onSuccess = () => {} }) {
          db.collection("users").onSnapshot((e) => {
               e.forEach((u) => {
                    onSuccess(u.data());
                    return;
               });
          });
     }
}

export default Utils;
