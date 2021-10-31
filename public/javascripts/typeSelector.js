for (let i = 1; i < 76; i++) {
  const topicSelector = document.querySelector(`#englishTopicSelector${i}`);
  const typesSelector = document.querySelector(`#englishTypeSelector${i}`);
  topicSelector.addEventListener("change", (event) => {
    const specificTypes = types.filter(
      (type) => type.general === event.target.value
    );
    const html = "";
    for (let type of specificTypes) {
      const option = `<option value="${type._id}">${type.name}</option>`;
      html += option;
    }
    typesSelector.innerHTML = html;
  });
}
for (let i = 1; i < 61; i++) {
  const topicSelector = document.querySelector(`#mathTopicSelector${i}`);
  const typesSelector = document.querySelector(`#mathTypeSelector${i}`);
  topicSelector.addEventListener("change", (event) => {
    const specificTypes = types.filter(
      (type) => type.general === event.target.value
    );
    const html = "";
    for (let type of specificTypes) {
      const option = `<option value="${type._id}">${type.name}</option>`;
      html += option;
    }
    typesSelector.innerHTML = html;
  });
}
for (let i = 1; i < 41; i++) {
  const topicSelector = document.querySelector(`#readingTopicSelector${i}`);
  const typesSelector = document.querySelector(`#readingTypeSelector${i}`);
  topicSelector.addEventListener("change", (event) => {
    const specificTypes = types.filter(
      (type) => type.general === event.target.value
    );
    const html = "";
    for (let type of specificTypes) {
      const option = `<option value="${type._id}">${type.name}</option>`;
      html += option;
    }
    typesSelector.innerHTML = html;
  });
}
for (let i = 1; i < 41; i++) {
  const topicSelector = document.querySelector(`#scienceTopicSelector${i}`);
  const typesSelector = document.querySelector(`#scienceTypeSelector${i}`);
  topicSelector.addEventListener("change", (event) => {
    const specificTypes = types.filter(
      (type) => type.general === event.target.value
    );
    const html = "";
    for (let type of specificTypes) {
      const option = `<option value="${type._id}">${type.name}</option>`;
      html += option;
    }
    typesSelector.innerHTML = html;
  });
}
