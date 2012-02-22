module Rack
  class Codehighlighter
    include Rack::Utils
    def call(env)
      began_at = Time.now
      status, headers, response = @app.call(env)
      headers = HeaderHash.new(headers)

      if !STATUS_WITH_NO_ENTITY_BODY.include?(status) &&
         !headers['transfer-encoding'] &&
          headers['content-type'] &&
          headers['content-type'].include?("text/html")

        content = ""
        response.each { |part| content += part }
        doc = Nokogiri::HTML(content, nil, 'UTF-8')
        nodes = doc.search(@opts[:element])
        nodes.each do |node|
          s = node.inner_html || "[++where is the code?++]"
          if @opts[:markdown]
            node.parent.swap(Nokogiri::XML::DocumentFragment.new(doc,send(@highlighter, s)))
          else
            node.swap(Nokogiri::XML::DocumentFragment.new(doc,send(@highlighter, s)))
          end
        end

        body = doc.to_html
        headers['content-length'] = bytesize(body).to_s

        log(env, status, headers, began_at) if @opts[:logging]
        [status, headers, [body]]
      else
        [status, headers, response]
      end
    end
  end
end

