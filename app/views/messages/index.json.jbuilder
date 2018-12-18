json.array! @new_messages.each do |message|
  json.content message.content
  json.user_id message.user.id
  json.user_name message.user.name
  json.image message.image.url
  json.date message.created_at.strftime('%F %T')
  json.id message.id
end
