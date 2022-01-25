import requests
import os

cwd = os.getcwd()

f = open("images.js",mode="w")
f.write("const images = [")
for x in range(5):
    response = requests.get('https://api.unsplash.com/photos/random?client_id=SsM-N_7iCgrCVRMLD9MzbryaZYgClSPUA-9rFfHxxaA')
    json = response.json()
    urls = json["urls"]
    raw = urls["raw"]
    f.write("'"+ raw + "&q=25&w=250" +"',\n")
f.write("]") 
f.write("module.exports = {images}")
f.close()
