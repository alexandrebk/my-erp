class TasksController < ApplicationController
    skip_before_action :authenticate_user!, only: :index

  def index
    @task = Task.new
  end

  def show
    @test = "test1"
  end

  def finish
    @test = "test1"
  end

  def create
    @task         = Task.new(task_params)
    @task.user_id = current_user.id
    @task.done    = false
    @task.save
    redirect_to root_path
  end

private

  def task_params
    params.require(:task).permit(:name, :ending_date, :category_id)
  end
end
