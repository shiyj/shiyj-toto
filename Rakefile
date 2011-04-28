require 'toto'

@config = Toto::Config::Defaults

task :default => :new

desc "Create a new article."
task :new do
  url =ask('Url:')
  title=ask('Title:')
  #slug = title.empty?? nil : title.strip.slugize
  slug = url.empty?? nil : url.strip.slugize
  article = "--- \n"
  hash = {'title' => title,
          'date' => Time.now.strftime("%d/%m/%Y"),
          'slug' => slug,
          'author' => "史英建"}
  hash.each{|key,value| article << ("#{key}: #{value}\n")}
  #article = {'title' => '','author'=>'史英建', 'date' => Time.now.strftime("%d/%m/%Y")}.to_yaml
  article << "\n"
  article << "在此处以下输入博客内容.\n\n"

  path = "#{Toto::Paths[:articles]}/#{Time.now.strftime("%Y-%m-%d")}#{'-' + slug if slug}.#{@config[:ext]}"

  unless File.exist? path
    File.open(path, "w") do |file|
      file.write article
    end
    toto "文章生成成功: #{path}."
  else
    toto "已存在#{path}文件!."
  end
end

desc "Publish my blog."
task :publish do
  toto "publishing your article(s)..."
  `git push heroku master`
  `git push origin master`
end

desc "Publish the blog locally."
task :local do
    toto "deploying locally..."
    `thin start -R config.ru`
end

def toto msg
  puts "\n  toto ~ #{msg}\n\n"
end

def ask message
  print message
  STDIN.gets.chomp
end

