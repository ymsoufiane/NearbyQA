class QuestionsController < ApplicationController
    before_action :authorize_request
    before_action :set_question, only: [:show, :update, :destroy]
  
    # GET /questions
    def index
      @questions = Question.all
      render json: @questions
    end
  
    # GET /questions/1
    def show
      render json: @question
    end
  
    # POST /questions
    def create
      @question = Question.new(question_params)
        @question.user=@current_user
      if @question.save
        render json: @question, status: :created
      else
        render json: @question.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /questions/1
    def update
      if @question.update(question_params)
        render json: @question
      else
        render json: @question.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /questions/1
    def destroy
      @question.destroy
      head :no_content
    end
    
    def nearby_questions

        longitude = params[:longitude].to_i
        latitude = params[:latitude].to_i
        
        coordinates = [longitude, latitude]
        max_distance= params[:maxDistance].to_i

        query={
            '$near' => {
              '$geometry' => {
                type: "Point" ,
                coordinates: coordinates
              },
            }
          }
        if max_distance
            query['$near']['$maxDistance'] = max_distance
        end

        
        @questions = Question.where(
            location: query
          ).limit(10)
        render json: @questions
    end

    private
  
    def set_question
      @question = Question.find_by(id:params[:id])
    rescue Mongoid::Errors::DocumentNotFound
      render json: { error: 'Question not found' }, status: :not_found
    end
  
    def question_params
      params.require(:question).permit(:title, :content, :latitude, :longitude, :maxDistance, location: [],)
    end
  end
  