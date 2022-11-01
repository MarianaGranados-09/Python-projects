import requests
import lxml.html

html = requests.get('https://store.steampowered.com/explore/new/')
doc = lxml.html.fromstring(html.content) #object of HtmlElement type
#object with xpath method used to query the html doc
#structured way to extract info from html doc

new_releases = doc.xpath('//div[@id="tab_newreleases_content"]')[0]
#returns a list with all the divs in html page with id of
#tab_newreleases_content
#// search all tags in html document that match our filters
#div tells lxml to search for div tags
#[@id="tab_newreleases_content"] search for divs with id of ...

titles = new_releases.xpath('.//div[@class="tab_item_name"]/text()')
#. tells lxml to look in the tags which are the chidren of the
#new_releases tag
#[@class="tab_item_name"] filtering based on the class name
#/text() tells lxml we want text contained within the tag extracted

prices = new_releases.xpath('.//div[@class="discount_final_price"]/text()')

# print(titles)
# print(prices)

tags_divs = new_releases.xpath('.//div[@class="tab_item_top_tags"]')
tags = []
for div in tags_divs:
    #text_content() method returns the text contained within an html tag
    tags.append(div.text_content())
#print(tags)

#return a JSON response so that we can easily turn this into a web
#based API or use it in some other project

#zip function to iterate over all those lists
#then create a dict for each game and assign the title, price and tags
#as a separate key in that dict. append that dict to the output list
output = []
for info in zip(titles, prices, tags):
    resp = {}
    resp['title'] = info[0]
    resp['price'] = info[1]
    resp['tags'] = info[2]
    output.append(resp)

print(output)
