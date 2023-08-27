Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # user routes
  post 'signup', to: 'user#create'
  post 'signin', to: 'authentication#login'
  get 'users', to: 'user#index'
  get 'users/:id', to: 'user#show'
  put 'users/:id', to: 'user#update'
  delete 'users/:id', to: 'user#destroy'

  # question routes
  get 'questions', to: 'questions#index'
  get 'questions/nearby', to: 'questions#nearby_questions'
  get 'questions/:id', to: 'questions#show'
  post 'questions', to: 'questions#create'
  put 'questions/:id', to: 'questions#update'
  delete 'questions/:id', to: 'questions#destroy'

  # response routes
  post 'questions/:question_id/responses', to: 'response#create'
  get 'questions/:question_id/responses/:id', to: 'response#show'
  delete 'questions/:question_id/responses/:id', to: 'response#destroy'
  get 'questions/:question_id/responses', to: 'response#index'

  # favorite question routes
  post 'questions/:question_id/favorite_questions', to: 'favorite_questions#create'
  get 'favorite_questions', to: 'favorite_questions#index'
  delete 'questions/:question_id/favorite_questions/:id', to: 'favorite_questions#destroy'


end
