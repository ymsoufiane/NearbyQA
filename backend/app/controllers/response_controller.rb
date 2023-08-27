class ResponseController < ApplicationController
    before_action :authorize_request
    before_action :set_question
    before_action :set_response, only: [:show, :destroy]
  
    # POST /questions/:question_id/responses
    def create
      @response = @question.responses.new(response_params)
      @response.user = @current_user
  
      if @response.save
        render json: @response, status: :created
      else
        render json: @response.errors, status: :unprocessable_entity
      end
    end
  
    # GET /questions/:question_id/responses/:id
    def show
      render json: @response
    end
  
    # DELETE /questions/:question_id/responses/:id
    def destroy
      @response.destroy
      head :no_content
    end
  
    private
  
    def set_question
      @question = Question.find(params[:question_id])
    rescue Mongoid::Errors::DocumentNotFound
      render json: { error: 'Question not found' }, status: :not_found
    end
  
    def set_response
      @response = @question.responses.find(params[:id])
    rescue Mongoid::Errors::DocumentNotFound
      render json: { error: 'Response not found' }, status: :not_found
    end
  
    def response_params
      params.require(:response).permit(:content)
    end
  end
  