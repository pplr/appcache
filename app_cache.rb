# coding: utf-8

require 'sinatra'

module AppCache

  class App < Sinatra::Base
    @@version = 0;

    configure do
      mime_type :appcache, 'text/cache-manifest'
    end

    set :haml, :format => :html5

    get "/manifest.appcache" do
      content_type :appcache
      "CACHE MANIFEST\n" +
        format("# version %d\n", @@version) +
        to("/js/jquery.js", false) + "\n" +
        to("/js/app.js", false) + "\n" +
        "NETWORK:\n*\n"

    end

    get "/" do
      haml(:index)
    end

    post "/inc" do
      @@version = @@version + 1
    end

    helpers do
      def version
        @@version
      end
    end

  end
end
