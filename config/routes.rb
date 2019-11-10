Rails.application.routes.draw do
  get 'home/index', to: 'home#index'

  devise_for :users
  resources :users, only: [:show, :edit, :update]
  get 'users/:id/followers', to: 'users#followers', as: 'user_followers'
  get 'users/:id/followed_users', to: 'users#followed_users', as: 'user_followed_users'
  
  resources :posts, only: [:new, :create, :index, :show]
  resources :relationships, only: [:index, :new, :create]
  
  root :to => "home#index"
end