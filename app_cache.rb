# coding: utf-8

require 'sinatra'

module AppCache

  @@version = 0;

  class App < Sinatra::Base
    configure do
      mime_type :appcache, 'text/cache-manifest'
    end

    set :haml, :format => :html5

    get "/manifest.appcache" do
      content_type :appcache
      "CACHE MANIFEST\n" +
        format("# version %d\n", @@version) +
        "CACHE\n" +
        to("/js/jquery.js") + "\n"
    end

    get "/" do
      haml(:index)
    end

    post "/inc" do
      @@version = @@version + 1
    end

  end
end
