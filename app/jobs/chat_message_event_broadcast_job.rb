class ChatMessageEventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(chat_messages)
    ActionCable
      .server
      .broadcast('chat_channel',
                 chat_messages
      )
  end
end
