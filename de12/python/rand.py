import random

def main():
    lower_bound = 1
    upper_bound = 100
    target_number = random.randint(lower_bound, upper_bound)
    attempts = 0

    print(f"1から100までの数で数字を当ててください。")
    print(f"ヒント: {lower_bound}から{upper_bound}の範囲です。")

    while True:
        try:
            guess = int(input("予想した数を入力して下さい："))
            attempts += 1

            if guess < lower_bound or guess > upper_bound:
                print(f"有効な範囲内の数字を入力してください({lower_bound}から{upper_bound}の間)。")
            elif guess < target_number:
                print("もっと大きな数字です。")    
            elif guess > target_number:
                print("もっと小さな数字です。")
            else:
                print(f"正解！{target_number}を{attempts}回目で当てました。")
                break  # 正解した場合はループを終了します。
        except ValueError:
            print("無効な数字です。")



