class Question
    include Mongoid::Document
    include Mongoid::Timestamps
    field :title, type: String
    field :content, type: String
    field :location, type: Array # [longitude, latitude]

    field :user , type: User
    field :responses, type: Array
    field :favorite_questions, type: Array

    index({ location: '2dsphere' })

    has_many :favorite_questions
    has_many :responses
    belongs_to :user

  end
  