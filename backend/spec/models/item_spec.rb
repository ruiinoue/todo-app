require 'rails_helper'

RSpec.describe Item, type: :model do

    describe "リレーションの確認" do
        describe "1対多の関係" do
          it "todoとbelong_toの関係である" do
            should belong_to(:todo)
          end
        end
    end

    describe "有効性を確認" do
        let(:todo) { Todo.new(todo_params) }
        let(:todo_params) { { title: 'Mozart', created_by: "1" } }
        let(:items) { Item.new(items_params) }
        let(:items_params) { { name: 'test', done: true, todo: todo } }

        context "無効パターン" do
            it "nameが無効" do
                items.name = " "
                expect(items).to be_invalid
            end

            it "doneが無効" do
                items.done = nil
                expect(items).to be_invalid
            end

            it "todoが無効" do
                items.todo = nil
                expect(items).to be_invalid
            end

            it "nameとdoneが無効" do
                items.name = " "
                items.done = nil
                expect(items).to be_invalid
            end

            it "doneとtodoが無効" do
                items.done = nil
                items.todo = nil
                expect(items).to be_invalid
            end

            it "nameとtodoが無効" do
                items.name = " "
                items.todo = nil
                expect(items).to be_invalid
            end

            it "name・done・todoすべて無効" do
                items.name = " "
                items.done = nil
                items.todo = nil
                expect(items).to be_invalid
            end
        end

        context "有効パターン" do
            it "name・done・todoすべて有効" do
                expect(items).to be_valid
            end
        end
    end

    describe "存在性を確認" do
        context "Itemの存在を確認" do
          it "nameが存在する" do
            should validate_presence_of(:name)
          end

          it "doneが存在する" do
            should validate_presence_of(:done)
          end
        end
    end
end
