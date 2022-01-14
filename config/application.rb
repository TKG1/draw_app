require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module DrawEmaApp
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    config.generators do |g|
      g.skip_routes     true           # routes.rbにルーティングを追加しない、falseで追加する(falseがデフォルト)
      g.assets          false          # assets以下のファイル(CSS, JavaScriptファイル)を作成しない 
      g.helper          false          # helper以下にファイルを作成しない 
      g.test_framework  false          # test以下にファイル作成しない     
    end      

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
