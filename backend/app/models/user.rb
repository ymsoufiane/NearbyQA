class User 
  include Mongoid::Document
  field :name, type: String
  field :email, type: String
  field :password, type: String

  validates :email, presence: true
  validates_uniqueness_of :email
  validates :name, presence: true
  validates :password, presence: true

  def authenticate(password)

   BCrypt::Password.new(self.password)==password
  end

  has_many :questions, dependent: :destroy
  has_many :favorite_questions , dependent: :destroy
  has_many :responses, dependent: :destroy
end
