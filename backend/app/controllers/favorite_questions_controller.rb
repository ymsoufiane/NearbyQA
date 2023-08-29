class FavoriteQuestionsController < ApplicationController
    before_action :authorize_request
    before_action :set_question, only: [:create, :destroy]
    before_action :set_favorite_question, only: :destroy
  
    # POST /questions/:question_id/favorite_questions
    def create
      
      if params[:is_favorite]
        @question.favorite_questions.where(user_id: @current_user.id).destroy_all
      else 
        @favorite_question = @question.favorite_questions.new
        @favorite_question.user = @current_user
    
        if @favorite_question.save
          render json: @favorite_question, status: :created
        else
          render json: @favorite_question.errors, status: :unprocessable_entity
        end
      end
    end
  
    # GET /favorite_questions
    def index

      @favorite_questions = @current_user.favorite_questions.includes(:question)
      
      question_ids = @favorite_questions.map(&:question_id)
      questions = Question.where(:id.in => question_ids)
      render json: questions
    end
  
    # DELETE /questions/:question_id/favorite_questions/:id
    def destroy
      @favorite_question.destroy
      head :no_content
    end
  
    private
  
    def set_question
      @question = Question.find(params[:question_id])
    rescue Mongoid::Errors::DocumentNotFound
      render json: { error: 'Question not found' }, status: :not_found
    end
  
    def set_favorite_question
      @favorite_question = @question.favorite_questions.find(params[:id])
    rescue Mongoid::Errors::DocumentNotFound
      render json: { error: 'Favorite question not found' }, status: :not_found
    end

    def favorite_question_params
      params.require(:favorite_question).permit(:user_id, :question_id, :is_favorite)
    end
  end
  