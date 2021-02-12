class TodosController < ApplicationController
    before_action :set_todo, only: [:show, :update, :destroy]

    # GET /todo を叩く
    def index
        @todo = Todo.all
        json_response(@todo)
    end

    # POST /todo を叩く
    def create
        @todo = Todo.create!(todo_params)
        json_response(@todo, :created)
    end
    
    # GET /todo/:id を叩く
    def show
        json_response(@todo)
    end

    # PUT /todo/:id を叩く
    def update
        @todo.update(todo_params)
        head :no_content
    end

    # DELETE /todo/:id を叩く
    def destroy
        @todo.destroy
        head :no_content
    end
    
    private

        def todo_params
            params.permit(:title, :created_by)
        end
        

        def set_todo
            @todo = Todo.find(params[:id])
        end    
end
