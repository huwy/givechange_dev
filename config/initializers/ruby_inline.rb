ENV['HOME'] = "/home/build" if ENV['RAILS_ENV'] == 'production'
ENV['INLINE'] = "/tmp" if ENV['RAILS_ENV'] == 'production'
