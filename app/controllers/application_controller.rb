class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :fetch_user
  before_action :set_all_highscores

 
  private
  def set_all_highscores
    highscores = Highscore.all
    @allhighscores = Highscore.order(score: :desc).limit(5)
    # @topuser
  end
  def fetch_user
   @current_user = User.find_by :id => session[:user_id] if session[:user_id].present?
   gon.user_id = @current_user.id if @current_user
   session[:user_id] = nil unless @current_user.present?
  end
end
