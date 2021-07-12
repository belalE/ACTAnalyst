const sectionSelector = document.querySelector("#section");
const topicSelector = document.querySelector("#general");
sectionSelector.addEventListener("change", (event) => {
  const specificTopics = topics[event.target.value.toLowerCase()];
  var html = "";
  for (let topic of specificTopics) {
    const option = `<option value="${topic}">${topic}</option>`;
    html += option;
  }
  topicSelector.innerHTML = html;
});
