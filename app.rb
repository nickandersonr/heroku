require 'sinatra'

#syntax was wrong - also, the index should be an .erb file, not .html:
get '/' do
  erb :index
end

=begin

### Your code, with annotations ###

get '/'
  File.read('index.html') <--- incorrect syntax
end

get 'favorites' do
  response.header['Content-Type'] = 'application/json'
  File.read('data.json')
end

get '/favorites' do
  file = JSON.parse(File.read('data.json'))
  unless params[:name] && params[:oid]
    return 'Invalid Request'
  movie = { name: params[:name], oid: params[:oid] }
  file << movie
  File.write('data.json',JSON.pretty_generate(file))
  movie.to_json
end

=end
