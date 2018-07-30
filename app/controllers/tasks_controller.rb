class TasksController < ApplicationController
    skip_before_action :authenticate_user!, only: :index

  def index
  end

  def show
    @test = "test1"
  end

  def finish
    @test = "test1"
  end
end
