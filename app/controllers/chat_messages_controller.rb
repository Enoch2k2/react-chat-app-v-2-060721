class ChatMessagesController < ApplicationController
  def index
    @chat_messages = ChatMessage.all
    render json: @chat_messages
  end
end
