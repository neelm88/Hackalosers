# Initial data ingest for clubs

import requests
from bs4 import BeautifulSoup
import json

clubs = []

init_request = requests.get(
    "https://activities.osu.edu/involvement/student_organizations/find_a_student_org?v=list&l=ALL&c=Columbusz") #init request
init_soup = BeautifulSoup(init_request.content, "html.parser") #beautiful soup object
clubs_tags = init_soup.find("table", {"class": "c-table"}).findChildren("tr", recursive = False) #get tr rows

# get club information
for club_node in clubs_tags:
    if not club_node.has_attr('class'):
        temp = dict()
        name_block, mission_block, affil_block = club_node.findChildren('td')
        
        name = club_node.find('a').get_text().strip(' \\u\t\n\r')
        link = "https://activities.osu.edu" + club_node.find('a')['href']
        
        mission = mission_block.get_text().strip(' \t\n\r')
        temp['name'] = name
        temp['mission'] = mission
        temp['link'] = link

        affiliations = affil_block.get_text().split(',')
        affil_stripped = [val.strip(" \t\n\r|") for val in affiliations]
        count = 0
        for val in affil_stripped:
            if count == 0:
                temp['location'] = val
            elif count == 1:
                temp['type'] = val
            else:
                temp['service'] = val
            count += 1

        clubs.append(temp)
        
with open("data_ingest/club_data.json", 'w+') as json_cache:
    json.dump({'key': clubs}, json_cache, indent=4, sort_keys=True)
