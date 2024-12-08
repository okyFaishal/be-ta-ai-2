import json
import math
from queue import PriorityQueue
import sys

# Fungsi untuk menghitung jarak Euclidean (jarak garis lurus)
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Radius bumi dalam kilometer
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

# Fungsi untuk menemukan koordinat terdekat dari data
def find_nearest_node(coord, data):
    min_distance = float('inf')
    nearest_node = None
    for key, rute in data.items():  # Mengakses data berdasarkan key utama
        for point in rute:
            distance = haversine(float(coord[0]), float(coord[1]), float(point['lat_rute_koordinat']), float(point['lng_rute_koordinat']))
            if distance < min_distance:
                min_distance = distance
                nearest_node = point
    return nearest_node

# A* Algorithm
def a_star(data, start, goal):
    def get_neighbors(node):
        neighbors = []
        for key, rute in data.items():
            for i, point in enumerate(rute):
                # Cek node berikutnya dalam rute yang sama
                if point['id_rute_koordinat'] == node['id_rute_koordinat']:
                    if i + 1 < len(rute):  # Tetangga berikutnya
                        neighbors.append(rute[i + 1])
                    if i - 1 >= 0 and point['satu_arah'] == 0:  # Tetangga sebelumnya (jika bukan satu arah)
                        neighbors.append(rute[i - 1])
        return neighbors

    open_set = PriorityQueue()
    open_set.put((0, start['id_rute_koordinat']))
    came_from = {}
    g_score = {start['id_rute_koordinat']: 0}
    f_score = {start['id_rute_koordinat']: haversine(float(start['lat_rute_koordinat']), float(start['lng_rute_koordinat']), float(goal['lat_rute_koordinat']), float(goal['lng_rute_koordinat']))}

    nodes = {start['id_rute_koordinat']: start}

    while not open_set.empty():
        current_id = open_set.get()[1]
        current = nodes[current_id]

        if current['id_rute_koordinat'] == goal['id_rute_koordinat']:
            path = []
            while current_id in came_from:
                path.append(current)
                current_id = came_from[current_id]
                current = nodes[current_id]
            path.append(start)
            return path[::-1]

        for neighbor in get_neighbors(current):
            if neighbor['banjir'] == 1:
                continue

            tentative_g_score = g_score[current['id_rute_koordinat']] + haversine(
                float(current['lat_rute_koordinat']),
                float(current['lng_rute_koordinat']),
                float(neighbor['lat_rute_koordinat']),
                float(neighbor['lng_rute_koordinat'])
            )

            neighbor_id = neighbor['id_rute_koordinat']
            if neighbor_id not in g_score or tentative_g_score < g_score[neighbor_id]:
                came_from[neighbor_id] = current['id_rute_koordinat']
                g_score[neighbor_id] = tentative_g_score
                f_score[neighbor_id] = tentative_g_score + haversine(
                    float(neighbor['lat_rute_koordinat']),
                    float(neighbor['lng_rute_koordinat']),
                    float(goal['lat_rute_koordinat']),
                    float(goal['lng_rute_koordinat'])
                )
                open_set.put((f_score[neighbor_id], neighbor_id))
                nodes[neighbor_id] = neighbor

    return None

# Ambil input dari Node.js
input_data = sys.stdin.read()
data = json.loads(input_data)
# print(data)

# data rute
# rute_jalan = './json/rute-semarang.json'
rute_jalan = data['direktoriRute']
# Buka file JSON
with open(rute_jalan, 'r') as file:
    rute_jalan = json.load(file) 
dataRute = rute_jalan
# print(f"dataRute: {dataRute}")
# Load data dari Google Drive
# file_path = "/content/drive/My Drive/USM/Kecerdasan Buatan/tugas akhir/data-rute-1.json"
# with open(file_path, 'r') as file:
#     dataRute = json.load(file)

# Input koordinat asal dan tujuan
asal = data['asal']
tujuan = data['tujuan']

# Cari koordinat terdekat
start_node = find_nearest_node(asal, dataRute)
goal_node = find_nearest_node(tujuan, dataRute)

# Debug koordinat yang dipilih
# print(f"Start Node: {start_node}")
# print(f"Goal Node: {goal_node}")

# Jalankan algoritma A*
path = a_star(dataRute, start_node, goal_node)

# Tampilkan hasil
if path:
    # print("Rute terpendek:")
    print(path)
    # print("")
    # for step in path:
    #     print(f"Lat: {step['lat_rute_koordinat']}, Lng: {step['lng_rute_koordinat']}")
else:
    print("Tidak ada rute yang ditemukan.")
