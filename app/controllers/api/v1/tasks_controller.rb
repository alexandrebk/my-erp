class Api::V1::TasksController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    tasks = Task.all
    render json: tasks # see Message.as_json method
  end

  def create
    # message = @channel.messages.build(content: params[:content])
    puts params[:name]
    task = Task.new(name: params[:name], ending_date: params[:ending_date], done: params[:done], category_id: params[:category_id], created_at: Date.today, updated_at: Date.today)
    p task
    puts "JE SAVE LA TASK"
    task.save
    render json: task # see Message.as_json method
  end
end
