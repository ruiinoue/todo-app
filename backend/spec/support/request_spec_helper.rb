module RequestSpecHelper

    # JSON形式で返ってくるものをrubyハッシュに変換
    def json
        JSON.parse(response.body)
    end
end