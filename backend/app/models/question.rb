class Question
    include Mongoid::Document
    include Mongoid::Timestamps
    field :title, type: String
    field :content, type: String
    field :location, type: Array # [longitude, latitude]
  
    belongs_to :user
  
    index({ location: '2dsphere' })
    has_many :favorite_questions
    has_many :responses
  end
  