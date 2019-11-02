# Initial data ingest for 

import requests
from bs4 import BeautifulSoup
import json

clubs = dict()


init_request = requests.get(
    "https://activities.osu.edu/involvement/student_organizations/find_a_student_org?v=list&l=ALL&c=Columbusz") #init request
init_soup = BeautifulSoup(init_request.content, "html.parser") #beautiful soup object
clubs_tags = init_soup.find("table", {"class": "c-table"}).findChildren("tr", recursive = False) #get tr rows

# get club information
for club_node in clubs_tags:
    if not club_node.has_attr('class'):
        name_block, mission_block, affil_block = club_node.findChildren('td')
        
        name = club_node.find('a').get_text().strip(' \\u\t\n\r')
        link = club_node.find('a')['href']
        
        mission = mission_block.get_text().strip(' \\u\t\n\r')
        
        affiliations = affil_block.get_text().split(',')

        # add club info
        if name not in clubs:
            clubs[name] = [mission, [val.strip(' \\u\t\n\r') for val in affiliations], link]
        
with open("data_ingest/club_data.json", 'w+') as json_cache:
    json.dump(clubs, json_cache, indent=4, sort_keys=True)