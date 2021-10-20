Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/chat_messages" => "chat_messages#index"
  mount ActionCable.server => '/cable'
end
