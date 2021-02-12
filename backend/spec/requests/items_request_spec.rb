require 'rails_helper'

RSpec.describe "Items", type: :request do
    let!(:todo) { create(:todo) }
    let!(:items) { create_list(:item, 20, todo_id: todo.id) }
    let(:todo_id) { todo.id }
    let(:id) { items.first.id }

    describe "GET /todos/:todo_id/items を叩くとき" do
        before { get "/todos/#{todo_id}/items" }

        context "todoが存在するとき" do
            it "ステータスコード200を返す" do
                expect(response).to have_http_status(200)
            end

            it "todoの中のすべてのitemを返す" do
                expect(json.size).to eq(20)
            end
        end
        
        context "todoが存在しないとき" do
            let(:todo_id) { 0 }

            it "ステータスコード404を返す" do
                expect(response).to have_http_status(404)
            end

            it "エラーメッセージを表示する" do
                expect(response.body).to match(/Couldn't find Todo/)
            end
        end   
    end

    describe "GET /todos/:todo_id/items/:id を叩くとき" do
        before { get "/todos/#{todo_id}/items/#{id}" }

        context "todoの中にitemが存在するとき" do
            it "ステータスコード200を返す" do
                expect(response).to have_http_status(200)
            end

            it "itemが正しい形で存在する" do
                expect(json['id']).to eq(id)
            end
        end
        
        context "todoの中にitemが存在しないとき" do
            let(:id) { 0 }

            it "ステータスコード404を返す" do
                expect(response).to have_http_status(404)
            end

            it "エラーメッセージを表示する" do
                expect(response.body).to match(/Couldn't find Item/)
            end
        end
    end

    describe "POST /todos/:todo_id/items を叩くとき" do
        let(:valid_attributes) { { name: 'Sample', done: false } }

        context "有効なPOST" do
            before { post "/todos/#{todo_id}/items", params: valid_attributes }

            it "ステータスコード201を返す" do
                expect(response).to have_http_status(201)
            end
        end
        
        context "無効なPOST" do
            before { post "/todos/#{todo_id}/items", params: {} }

            it "ステータスコード422を返す" do
                expect(response).to have_http_status(422)
            end

            it "エラーメッセージを返す" do
                expect(response.body).to match(/Validation failed: Name can't be blank/)
            end
        end
    end

    describe "PUT /todos/:todo_id/items を叩くとき" do
        let(:valid_attributes) { { name: 'Change Sample' } }
        before { put "/todos/#{todo_id}/items/#{id}", params: valid_attributes }

        context "更新するitemが存在する" do
            it "ステータスコード204を返す" do
                expect(response).to have_http_status(204)
            end

            it "itemを更新する" do
                update_item = Item.find(id)
                expect(update_item.name).to match(/Change Sample/)
            end
        end
        
        context "更新するitemが存在しない" do
            let(:id) { 0 }

            it "ステータスコード404を返す" do
                expect(response).to have_http_status(404)
            end

            it "エラーメッセージを返す" do
                expect(response.body).to match(/Couldn't find Item/)
            end
        end
    end

    describe "DELETE /todos/:id を叩くとき" do
        before { delete "/todos/#{todo_id}/items/#{id}" }

        it 'ステータスコード204を返す' do
            expect(response).to have_http_status(204)
        end
    end
end
