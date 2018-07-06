Rails.application.routes.draw do
  get 'tasks/index'

  get 'tasks/show'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :tasks, only: [ :index, :create, :destroy, :update, :edit]
      get 'tasks/finish'
    end
  end

  # get 'api/v1/tasks/finish' , defaults: { format: :json }
  get 'tasks/finish', to: 'tasks#finish'
  resources :tasks, only: [ :index, :show ]
  root to: 'tasks#index'

end
