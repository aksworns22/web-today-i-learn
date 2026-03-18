// TODO: TIL 폼 등록 기능을 구현하세요
// 1. 폼 요소와 목록 요소를 querySelector로 선택합니다.
// 2. 폼의 submit 이벤트를 감지하여 새 TIL 항목을 목록에 추가합니다.

const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");

tilForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const $date = document.getElementsByName("date");
  const $title = document.getElementsByName("title");
  const $content = document.getElementsByName("content");

  console.log($date, $title, $content)

  const $til_time = document.createElement("time")
  $til_time.innerHTML = $date[0].value

  const $til_title = document.createElement("h3")
  $til_title.innerHTML = $title[0].value

  const $til_content = document.createElement("p")
  $til_content.innerHTML = $content[0].value

  const $til_item = document.createElement("article");
  $til_item.className = "til-item"

  $til_item.append($til_time, $til_title, $til_content)


  tilList.append($til_item);
});
