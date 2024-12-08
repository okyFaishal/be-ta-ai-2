import json
from math import radians, cos, sin, sqrt
import numpy as np
import sys
import networkx as nx

# Ambil input dari Node.js
input_data = sys.stdin.read()
data = json.loads(input_data)
# print(data)

rute_jalan = './json/rute-semarang.json'

# Buka file JSON
with open(rute_jalan, 'r') as file:
    rute_jalan = json.load(file)  # Membaca file JSON dan mengonversinya ke dictionary Python

# print(rute_jalan["elements"])
# Membuat graf berarah
graph = nx.DiGraph()



# Fungsi untuk menghitung jarak Euclidean (untuk heuristik A*)
def euclidean_distance(node1, node2):
    lat1, lon1 = node1
    lat2, lon2 = node2
    # Menghitung jarak menggunakan rumus Haversine
    R = 6371  # Radius bumi dalam kilometer
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2)**2
    c = 2 * np.arctan2(sqrt(a), sqrt(1 - a))
    distance = R * c  # jarak dalam kilometer
    return distance

# Membuat graph dari data JSON
G = nx.DiGraph()  # Graf berarah
road_names = {}  # Menyimpan nama jalan untuk setiap way
coordinates = {}

# Menambahkan edge ke graph dan menyimpan nama jalan
for element in rute_jalan['elements']:
    if element['type'] == 'way':
        way_id = element['id']
        nodes = element['nodes']
        tags = element.get('tags', {})
        road_name = tags.get('name', 'Unnamed')  # Nama jalan

        # Menyimpan nama jalan
        road_names[way_id] = road_name

        # Menambahkan edge antar nodes
        for i in range(len(nodes) - 1):
            node1 = nodes[i]
            node2 = nodes[i + 1]

            # Menentukan bobot berdasarkan panjang jalan atau atribut lain
            weight = 1  # Asumsi bobot 1 jika tidak ada data spesifik

            # Menambahkan node ke graph dan edge antar node
            G.add_edge(node1, node2, weight=weight)

            # Menyimpan koordinat untuk node
            if node1 not in coordinates:
                coordinates[node1] = (np.random.uniform(-90, 90), np.random.uniform(-180, 180))  # Simulasi koordinat
            if node2 not in coordinates:
                coordinates[node2] = (np.random.uniform(-90, 90), np.random.uniform(-180, 180))  # Simulasi koordinat

# Tentukan ID rute asal dan tujuan
start_id = data['wayAsal']
end_id = data['wayTujuan']
# start_id = 9859853
# end_id = 112669191

# Temukan node awal dan tujuan berdasarkan ID way
start_node = None
end_node = None

for element in rute_jalan['elements']:
    if element['type'] == 'way' and element['id'] == start_id:
        start_node = element['nodes'][0]  # Ambil node pertama sebagai titik awal
    if element['type'] == 'way' and element['id'] == end_id:
        end_node = element['nodes'][-1]  # Ambil node terakhir sebagai titik tujuan

if start_node is None or end_node is None:
    print("ID rute tidak ditemukan!")
    exit()

# Fungsi Heuristik untuk A*
def heuristic(u, v):
    return euclidean_distance(coordinates[u], coordinates[v])

# Jalankan A* untuk menemukan rute terbaik
path = nx.astar_path(G, source=start_node, target=end_node, heuristic=heuristic, weight='weight')
print(path)