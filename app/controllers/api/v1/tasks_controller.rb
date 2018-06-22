class Api::V1::TasksController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    tasks = Task.all
    render json: tasks # see Message.as_json method
  end

  def create
    task = Task.all
    task.user = current_user
    task.save
    render json: message # see Message.as_json method
  end
end
