require File.dirname(__FILE__) + "/config/setup_load_paths.rb"

# unless $LOAD_PATH.include?(File.expand_path(File.join(File.dirname(__FILE__), 'lib')))
#   $LOAD_PATH.unshift(File.expand_path(File.join(File.dirname(__FILE__), 'lib')))
# end

require File.dirname(__FILE__) + "/app_cache.rb"

set :run, false

run AppCache::App
