const eventIcons = {
  Mysterious:
    "https://static.wikia.nocookie.net/projectsekai/images/a/a4/Mysterious.svg/revision/latest/scale-to-width-down/30",
  Cool: "https://static.wikia.nocookie.net/projectsekai/images/f/f4/Cool.svg/revision/latest/scale-to-width-down/30",
  Pure: "https://static.wikia.nocookie.net/projectsekai/images/3/3c/Pure.svg/revision/latest/scale-to-width-down/30",
  Cute: "https://static.wikia.nocookie.net/projectsekai/images/3/38/Cute.svg/revision/latest/scale-to-width-down/30",
  Happy:
    "https://static.wikia.nocookie.net/projectsekai/images/c/ce/Happy.svg/revision/latest/scale-to-width-down/30",
};

const charIcons = {
  "Ichika": "https://static.wikia.nocookie.net/projectsekai/images/f/fa/Ichika_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Saki": "https://static.wikia.nocookie.net/projectsekai/images/4/4f/Saki_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Honami": "https://static.wikia.nocookie.net/projectsekai/images/a/a9/Honami_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Shiho": "https://static.wikia.nocookie.net/projectsekai/images/7/73/Shiho_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Minori": "https://static.wikia.nocookie.net/projectsekai/images/1/14/Minori_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Haruka": "https://static.wikia.nocookie.net/projectsekai/images/8/87/Haruka_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Airi": "https://static.wikia.nocookie.net/projectsekai/images/8/82/Airi_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Shizuku": "https://static.wikia.nocookie.net/projectsekai/images/8/86/Shizuku_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Kohane": "https://static.wikia.nocookie.net/projectsekai/images/8/80/Kohane_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "An": "https://static.wikia.nocookie.net/projectsekai/images/0/0c/An_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Akito": "https://static.wikia.nocookie.net/projectsekai/images/a/a4/Akito_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Toya": "https://static.wikia.nocookie.net/projectsekai/images/b/b7/Toya_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Tsukasa": "https://static.wikia.nocookie.net/projectsekai/images/c/ce/Tsukasa_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Emu": "https://static.wikia.nocookie.net/projectsekai/images/e/e1/Emu_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Nene": "https://static.wikia.nocookie.net/projectsekai/images/9/9f/Nene_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Rui": "https://static.wikia.nocookie.net/projectsekai/images/f/fa/Rui_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Kanade": "https://static.wikia.nocookie.net/projectsekai/images/6/65/Kanade_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Mafuyu": "https://static.wikia.nocookie.net/projectsekai/images/a/ab/Mafuyu_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Ena": "https://static.wikia.nocookie.net/projectsekai/images/9/9e/Ena_%28icon%29.png/revision/latest/scale-to-width-down/80",
  "Mizuki": "https://static.wikia.nocookie.net/projectsekai/images/e/ef/Mizuki_%28icon%29.png/revision/latest/scale-to-width-down/80",
}

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
  fetch("https://storage.googleapis.com/pjsk_bucket/events.json").then(
    async (events) => {
      const json = await events.json();
      const eventList = document.getElementById("eventlist");
      while (eventList.firstChild) {
        eventList.removeChild(eventList.lastChild);
      }
      for (const event of json) {
        const div = document.createElement("div");

        const a = document.createElement("a");
        a.text = event.title;
        a.href = event.link;
        a.target = "_blank";

        const img = document.createElement("img");
        if (event.attribute !== "World Link") {
          img.src = eventIcons[event.attribute];
        }
        
        const h2 = document.createElement("h2");
        h2.append(a);
        
        div.classList.add("event-list");
        div.append(h2);
        div.append(img);

        eventList.append(div);
        div.append(document.createElement("br"))
        for (const [key, value] of Object.entries(charIcons)) {
          for (const name of event.event_chars) {
            const firstName = name.split(" ").slice(-1)[0];
            if (firstName == key) {
              const checkmark = document.querySelector(`.${firstName}.${event.attribute}.checkbox`);
              if (checkmark !== null && checkmark.checked) {
                const img = document.createElement("img");
                img.src = value;
                div.append(img);
              }
              break;
            }
          }
        }
      }
    }
  );
}

function onClear(event) {
  for (check of document.querySelectorAll(".checkbox")) {
    check.checked = false;
  }
}
