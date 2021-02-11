require 'rails_helper'

RSpec.describe "Todos", type: :request do
    let!(:todos) { create_list(:todo, 10) }
    let(:todo_id) { todos.first.id }

    describe "GET /todos を叩いたとき" do
        # GET /todos をhttpリクエスト
        before { get '/todos' }

        it "todoが不足なく10個存在する" do
            expect(json).not_to be_empty
            expect(json.size).to eq(10)
        end

        it "ステータスコード200を返す" do
            expect(response).to have_http_status(200)
        end
    end

    describe "GET /todos/:id を叩いたとき" do
        # GET /todos/:id をhttpリクエスト
        before { get "/todos/#{todo_id}" }

        context "レコードが存在している" do
            it "Todoを返す" do
                expect(json).not_to be_empty
                expect(json['id']).to eq(todo_id)  
            end

            it "ステータスコード200を返す" do
                expect(response).to have_http_status(200)
            end
        end
        
        context "レコードが存在していない" do
            let(:todo_id) { 100 }

            it "ステータスコード404を返す" do
                expect(response).to have_http_status(404)
            end

            it "エラーメッセージを返す" do
                expect(response.body).to match(/Couldn't find Todo/)
            end
        end
    end
    
    describe "POST /todos を叩いたとき" do
        # 有効なparamsを設置
        let(:valid_attributes) { { title: 'Success Sample', created_by: '1' } }

        context "有効なPOST" do
            # POST /todos をhttpリクエスト
            before { post '/todos', params: valid_attributes }

            it "Todo を作成" do
                expect(json['title']).to eq('Success Sample')
                expect(json['created_by']).to eq('1')
            end

            it "ステータスコード201を返す" do
                expect(response).to have_http_status(201)
            end
        end

        context "無効なPOST" do
            # POST /todos をhttpリクエスト
            before { post '/todos', params: { title: 'Fail Sample' } }

            it "ステータスコード422を返す" do
                expect(response).to have_http_status(422)
            end

            it "エラーメッセージを返す" do
                expect(response.body).to match(/Validation failed: Created by can't be blank/)
            end
        end
    end

    describe "PUT /todos/:id を叩いたとき" do
        # 変更するtitleを設置
        let(:valid_attributes) { { title: 'Change Sample' } }

        context "更新が成功する" do
            before { put "/todos/#{todo_id}", params: valid_attributes }

            it "エラーなく更新される" do
                expect(response.body).to be_empty
            end

            it "ステータスコード204を返す" do
                expect(response).to have_http_status(204)
            end
        end
    end

    describe "DELETE /todos/:id を叩いたとき" do
        before { delete "/todos/#{todo_id}" }

        it "ステータスコード204を返す" do
            expect(response).to have_http_status(204)
        end
    end
end
