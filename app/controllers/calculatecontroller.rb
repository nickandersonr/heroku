class CalculatesController < ApplicationController
  def index
    @calculate = Calculate.all
  end

  def new
    @calculate = Calculate.new
  end

  def create
    @calculate = Calculate.new(params[:calculate])
    if @calculate.save
      redirect_to '/calculates'
    else
      render 'new'
      flash[:notice] = "Didn't work"
    end
  end
end