Rails.application.routes.draw do
  get 'home/index', to: 'home#index'

  devise_for :users
  resources :users, only: [:show, :edit, :update]
  resources :posts, only: [:new, :create, :index, :show]
  
  root :to => "home#index"
end
