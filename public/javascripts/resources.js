const resourcesDiv = document.querySelector("#resourcesDiv");
const counter = document.querySelector("#resourceCount");
var value = 0;
counter.addEventListener("change", (e) => {
  if (e.target.value > value) {
    value += 1;
    const resourceInput = `<div class='form-group resourceInput'>
    <label for="resource${value}Name">Name</label>
    <input type="text" id="resource${value}Name" name="questionType[resources][${value}][name]" class="form-control mb-3">
    <label for="resource${value}Link">Link</label>
    <input type="text" id="resource${value}Link" name="questionType[resources][${value}][link]" class="form-control mb-3">
    <label for="resource${value}Description">Description</label>
    <input type="text" id="resource${value}Description" name="questionType[resources][${value}][description]" class="form-control mb-3">
    <select name="questionType[resources][${value}][format]" id="resource${value}Format" class="form-select">
        <option value="" selected disabled>Select section</option>
        <option value="Video">Video</option>
        <option value="Article">Article</option>
        <option value="Text">Text</option>
        <option value="Formula">Formula</option>
      </select>
      <hr/>
      </div>`;
    resourcesDiv.innerHTML = resourcesDiv.innerHTML + resourceInput;
  } else {
    const resourceInputs = document.querySelectorAll(".resourceInput");
    const last = resourceInputs[resourceInputs.length - 1];
    last.remove();
    value -= 1;
  }
});
