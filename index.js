function openTab(event, tabName) {
  // Get all elements with class="tabcontent" and hide them
  let tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  let tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active";
}

function onSubmit(event) {
  fetch("https://storage.googleapis.com/pjsk_bucket/events.json").then(async (events) => {
    const json = await events.json();
    // console.log(json);
    const eventList = document.getElementById("eventlist");
    for (const event of json) {
      // console.log(event);
      const div = document.createElement("div");
      const h2 = document.createElement("h2");
      h2.textContent = event.title;
      div.append(h2)

      eventList.append(div)
    }
  });
}
[]