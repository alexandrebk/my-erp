class Api::V1::TasksController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    tasks = Task.all
    render json: tasks # see Message.as_json method
  end

  def create
    # message = @channel.messages.build(content: params[:content])
    puts "CREATE A TASK"
    task = Task.new(params[:content])
    task.save
    render json: task # see Message.as_json method
    # redirect_to(root_path)
  end
end
