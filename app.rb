require 'sinatra'
#you need to require json:
require 'json'

#setting haml, to use Sinatra's preferred templating standard
set :haml, format: :html5

#syntax was wrong - also, we'll be using haml, not .html:
get '/' do
  haml :index
end

#syntax was wrong here was well, a different call is required for this setup
get '/favorites' do
  content_type :json
  begin
    File.read('data.json')
  end
end

#instead of "getting" our json, content, we'll be "posting" it
post '/favorites' do
  content_type :json
  params = JSON.parse(request.body.read)
    
  data =
    begin
     JSON.parse(File.read('data.json'))
        rescue CheckLogFileForSpecificError = > e
            puts "ERROR: #{e}"
    end
  data << { name: params['name'], oid: params['oid'] }
  File.write('data.json', JSON.pretty_generate(data))
  data.to_json
end


=begin

### Your code, with annotations ###

get '/'
  File.read('index.html') <--- incorrect syntax
end

get 'favorites' do <--- missing a slash before 'favorites'
  response.header['Content-Type'] = 'application/json' <--- incorrect syntax
  File.read('data.json')
end

get '/favorites' do  <--- incorrect syntax
  file = JSON.parse(File.read('data.json'))
  unless params[:name] && params[:oid]
    return 'Invalid Request'
  movie = { name: params[:name], oid: params[:oid] }
  file << movie
  File.write('data.json',JSON.pretty_generate(file))
  movie.to_json
end

=end
