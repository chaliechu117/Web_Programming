import requests
from bs4 import BeautifulSoup
import csv


file= open('movie.csv', mode='w', newline='')
writer= csv.writer(file)
writer.writerow(["영화제목","이미지주소","평점","감독","출연자","개봉일자"])


MOVIE_URL = f'https://movie.naver.com/movie/running/current.nhn'
movie_html = requests.get(MOVIE_URL)
movie_soup = BeautifulSoup(movie_html.text,"html.parser")
#print(movie_soup)

movie_list_box=movie_soup.find('ul',{'class':'lst_detail_t1'})
movie_list = movie_list_box.find_all('li')

final_result=[]
for movie_items in movie_list:
    title = movie_items.find("dt",{"class":"tit"}).find("a").text
    star = movie_items.find("div",{"class":"star_t1"}).find("span",{"class":"num"}).text
    detail_dd= movie_items.find("dl",{"class":"info_txt1"}).find_all("dd")
    imgUrl=movie_items.find("div",{'class':'thumb'}).find("img")["src"]
    #출연자
    for i in detail_dd:
        actors_list=[]
        if i==detail_dd[0]:
            date=detail_dd[0].text.split()[-2]
        elif i==detail_dd[1]:
            director=detail_dd[1].find('span',{'class':'link_txt'}).find('a').text
        elif i==detail_dd[2]:
            actors = detail_dd[2].find('span',{'class':'link_txt'}).find_all('a')
            for j in actors:
                actors_list.append(j.text)

    result={
        'title': title,
        'imgUrl':imgUrl,
        'star': star,
        'director': director,
        'actors': actors_list,
        'date':date
    }

    final_result.append(result)

for result in final_result:
    row=[]
    row.append(result['title'])
    row.append(result['imgUrl'])
    row.append(result['star'])
    row.append(result['director'])
    row.append(result['actors'])
    row.append(result['date'])
    writer.writerow(row)

print(final_result)
