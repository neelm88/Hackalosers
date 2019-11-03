from sshtunnel import SSHTunnelForwarder
import psycopg2 as db
import json

remote_user = 'ec2-user'
remote_host = '3.16.24.144'
remote_port = 22
local_host = 'localhost'
local_port = 5432
def query(q, cur):
    cur.execute(q)
    return 0

def validate(hash, key):
    if key in hash:
        return(hash[key])
    else: 
        return("")

def readJSON(cur):
    with open('club_data.json') as json_file:
        data = json.load(json_file)
        for club in data['key']:
            query_str = "INSERT INTO clubs (affiliations, name, location, mission, link, other) VALUES (" \
                        + "\'" + validate(club, 'type') \
                        + "\', \'" + validate(club, 'name') \
                        + "\', \'" + validate(club, 'location') \
                        + "\', \'" + validate(club, 'mission') \
                        + "\', \'" + validate(club, 'link') \
                        + "\', \'" + validate(club, 'service') + "\');"  
            query(query_str, cur)

server = SSHTunnelForwarder((remote_host, remote_port),ssh_username=remote_user,ssh_private_key='~/.ssh/HVMInstanceHackolosers.pem',remote_bind_address=(local_host, local_port))
server.start()
conn = db.connect(host=local_host, port=server.local_bind_port, user='power_user', password='546358', dbname='club_info')
cur = conn.cursor()
readJSON(cur)
conn.commit()

cur.close()
conn.close()
server.close()