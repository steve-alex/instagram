Rails.application.routes.draw do
  get 'home/index', to: 'home#index'

  devise_for :users
  resources :users, only: [:show, :edit, :update]
  get 'users/:id/followers', to: 'users#followers', as: 'user_followers'
  get 'users/:id/followed_users', to: 'users#followed_users', as: 'user_followed_users'
  get 'users/:id/feed', to: 'users#feed', as: 'user_feed'
  get 'users/:id/posts', to: 'users#posts', as: 'user_posts'

  resources :posts, only: [:new, :create, :index, :show]
  post 'posts/:id', to: 'posts#like', as: 'like_post'
  patch 'posts/:id', to: 'posts#unlike', as: 'unlike_post'

  resources :relationships, only: [:index, :new, :create]
  
  root :to => "home#index"
end