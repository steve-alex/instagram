Rails.application.routes.draw do
  get 'home/index', to: 'home#index'

  devise_for :users
  resources :users, only: [:show]
  
  root :to => "home#index"
end
