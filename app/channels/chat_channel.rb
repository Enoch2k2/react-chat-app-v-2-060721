class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel"
  end

  def unsubscribed
    puts "unsubscribing now!"
    # Any cleanup needed when channel is unsubscribed
  end

  def create(opts)
    ChatMessage.create(
      content: opts.fetch('content')
    )
  end
end
