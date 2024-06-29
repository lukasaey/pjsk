from bs4 import BeautifulSoup
from requests import get
import html
import json
from datetime import datetime

list_page_url = "https://projectsekai.fandom.com/wiki/Events/Event_List/JP"
response = get(list_page_url)
soup = BeautifulSoup(response.text, "lxml")

link_elems = soup.select(".mw-parser-output > center:nth-child(1) > center:nth-child(2) > div:nth-child(2) > div > div > div > p > a")
event_links = ["https://projectsekai.fandom.com" + i["href"] for i in link_elems]

def get_event_info(link):
    print(link)
    response = get(link)
    soup = BeautifulSoup(response.text, "lxml")
    
    title_elem = soup.select_one("#firstHeading")
    if not title_elem:
        title_elem = soup.select_one(".mw-page-title-main")
    title = title_elem.text.lstrip().rstrip()

    header = soup.select_one(".mbox__content__header")
    if header and "This event has not begun yet!" in header:
        return {"title": title, "data": None}
    
    dates = soup.select(".mw-parser-output > table:nth-child(2) > tbody:nth-child(1) > tr > td > table > tbody > tr")
    
    for d in dates:
        if "Event End (EN)" in d.text:
            date_elem = d.select_one("td > div > span")
            date_str = " ".join(date_elem.text.replace("Local Time: ", "").split(" ")[:-1])
            date = datetime.strptime(date_str, "%B %d, %Y %H:%M:%S")
            if date < datetime.now():
                return None
    
    attribute_elem = soup.select_one(".mw-parser-output > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)")
    attribute = attribute_elem.text.rstrip().lstrip()

    event_chars_elems = soup.select(".mw-parser-output > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(5) > td > p > a")
    event_chars = [i["title"] for i in event_chars_elems]
    
    return {"title": title, "attribute": attribute, "event_chars": event_chars}

events = []

for e in event_links.__reversed__():
    info = get_event_info(e)
    if not info:
        break
    events.append(info)

events.reverse()

with open("events.json", "w") as f:
    f.write(json.dumps(events))

# print(get_event_info(event_links[0]))