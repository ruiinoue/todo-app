require 'rails_helper'

RSpec.describe Todo, type: :model do

  describe "リレーションの確認" do
    describe "1対多の関係" do
      it "itemsとhave_manyでdestroyアクションで依存関係である" do
        should have_many(:items).dependent(:destroy)
      end
    end
  end

  describe "有効性を確認" do
    let(:todo) { Todo.new(params) }
    let(:params) { { title: 'Mozart', created_by: "1" } }

    context "無効パターン" do
      it "titleが無効" do
        todo.title = " "
        expect(todo).to be_invalid
      end

      it "created_byが無効" do
        todo.created_by = " "
        expect(todo).to be_invalid
      end

      it "titleとcreated_by共に無効" do
        todo.title = " "
        todo.created_by = " "
        expect(todo).to be_invalid
      end
    end

    context "有効パターン" do
      it "titleとcreated_by共に有効" do
        expect(todo).to be_valid
      end
    end
  end

  describe "存在性を確認" do
    context "Todoの存在を確認" do
      it "titleが存在する" do
        should validate_presence_of(:title)
      end

      it "created_byが存在する" do
        should validate_presence_of(:created_by)
      end
    end
  end
end
