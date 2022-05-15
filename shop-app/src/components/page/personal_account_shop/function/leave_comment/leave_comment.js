import { UseContext } from "../../../../contract/context";
const CommentTest = async () => {
    //Stat'ы
  const { Contract } = UseContext();
  //Переменные из localStorage
  const address = localStorage.getItem("address")
  //Функция оформления коментария к отзыву
  try {
    const leaveComment = prompt("Введите комментарий:", undefined);
    const idFeedbach = prompt("Введите id отзыва:", undefined);
    await Contract.methods.leaveComment(leaveComment, idFeedbach).send({ from: address });
    alert("Комментарий оформлен.");
  } catch (e) {
    alert(e);
  }
}
export default CommentTest;