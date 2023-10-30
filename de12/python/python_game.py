import random 

def main():
    lower_bound = 1 
    upper_bound = 100
    target_number = random.randint(lower_bound, upper_bound) #1から100までの数字がランダムで選ばれるようになった。
    attempts = 0 #attemptsで何回挑戦したのかをカウントできる。

    print(f"1から100までの数で数字を当ててください。")
    print(f"ヒント: {lower_bound}から{upper_bound}の範囲です。") #１から１００までの数字を入力してもらうようにprintで文を出す。

    while True:
        try:
            guess = int(input("予想した数を入力して下さい：")) 
            attempts += 1

            if guess < lower_bound or guess > upper_bound: #予想の数字が大きいか小さいか。
                print(f"有効な範囲内の数字を入力してください({lower_bound}から{upper_bound}の間)。")
            elif guess < target_number:
                print("もっと大きな数字です。") #入力した数字より正解の数字が大きいときに出る。
            elif guess > target_number:
                print("もっと小さな数字です。") #入力した数字より正解の数字が小さいときに出る。
            else:
                print(f"正解！{target_number}を{attempts}回目で当てました。")   #正解の数字をtarget_numberで出し、回答回数
                break  # 正解した場合はループを終了します。
        except ValueError:
            print("無効な数字です。")   #範囲から逸脱した数字を入力したときに出る。

if __name__ == "__main__":  #スクリプトが直接実行された場合に内部のコードを実行するための条件と出てきたが、何のことだか全くわからない。このコードが無くても一応動いた。
    main()


