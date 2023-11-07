import requests
from PIL import Image
from IPython.display import display  # Jupyter Notebookでの表示のため

# 画像ファイルのパスをリストとして指定
image_paths = [
    r"C:\Users\Kiich\Downloads\27087195_s.jpg",  # 0
    r"C:\Users\Kiich\Downloads\27291013_s.jpg",  # 1
    r"C:\Users\Kiich\Downloads\4525538_s.jpg"   # 2
]

# 天気情報を取得
url = "https://api.weatherapi.com/v1/current.json?key=9578d0e7dac54754bc470314233110&q=Tokyo&aqi=yes"
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    place = data['location']['name']
    temperature = data['current']['temp_c']

    # 気温に応じて画像を選択
    if 15 <= temperature < 20:
        print(f"気温: {temperature}°C")
        # 15~20度の範囲の場合、指定の画像Aを表示
        image_url = image_paths[0]

    elif 20 <= temperature < 25:
        print(f"気温: {temperature}°C")
        # 20~25度の範囲の場合、指定の画像Bを表示
        image_url = image_paths[2]

    elif 25 <= temperature < 30:
        print(f"気温: {temperature}°C")
        image_url = image_paths[1]

    else:
        print(f"気温: {temperature}°C")
        print("指定の気温範囲外です。")

    # 選択した画像を表示
    img = Image.open(image_url)
    display(img)

else:
    print("気温情報を取得できませんでした。APIキーや場所を確認してください.")

print(place, temperature, "度")
