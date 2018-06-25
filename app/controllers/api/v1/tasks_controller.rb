class Api::V1::TasksController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    tasks = Task.all
    render json: tasks # see Message.as_json method
  end

  def create
    puts params[:name]
    task = Task.new(name: params[:name], ending_date: params[:ending_date], done: params[:done], category_id: params[:category_id], created_at: Date.today, updated_at: Date.today)
    p task
    puts "JE SAVE LA TASK"
    task.save
    render json: task # Est-ce que cette ligne est utile? Tester sans ça.
  end

  def edit          # GET /tasks/:id/edit
  end

  def update        # PATCH /tasks/:id
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
  end

private

  def task_params
    params
      .require(:task)
      .permit(
        :name,
        :ending_date,
        :done
      )
  end

end
