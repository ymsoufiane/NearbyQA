class Response
  include Mongoid::Document
  include Mongoid::Timestamps
  field :content, type: String
  field :user, type: User
  belongs_to :question
  belongs_to :user

end
