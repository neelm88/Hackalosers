from sshtunnel import SSHTunnelForwarder
import psycopg2 as db

remote_user = 'ec2-user'
remote_host = '3.16.24.144'
remote_port = 22
local_host = 'localhost'
local_port = 5432


print('you know how to run pyhton code in vs');

def query(q):
     with SSHTunnelForwarder(
            (remote_host, remote_port),
            ssh_username=remote_user,
            ssh_private_key='~/.ssh/HVMInstanceHackolosers.pem',
            remote_bind_address=(local_host, local_port)
     ) as server:
          conn = db.connect(host=local_host,
          port=server.local_bind_port,
          user='power_user',
          password='546358',
          dbname='club_info')
          cur = conn.cursor()
          cur.execute(q)
          return cur.fetchall()

df = query('SELECT * FROM users')
print(df[0])
