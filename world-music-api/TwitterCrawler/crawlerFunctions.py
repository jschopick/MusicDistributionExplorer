# -*- coding: utf-8 -*-
"""
Created on Wed Oct 31 14:27:57 2018

@author: Kushagra Singh
"""

import twython
from twython import Twython, TwythonError
import json
import urllib3
import urllib3.request
import geopy
from geopy.geocoders import Nominatim
import csv
import time
import os
from random import shuffle

def accessTokens()
    ACCESS_TOKEN = 
    ACCESS_SECRET = 
    CONSUMER_KEY = 
    CONSUMER_SECRET = 
    
    t= Twython (
            CONSUMER_KEY,
            CONSUMER_SECRET,
            ACCESS_TOKEN,
            ACCESS_SECRET
            )
    
    ACCESS_TOKEN = 
    ACCESS_SECRET = 
    CONSUMER_KEY = 
    CONSUMER_SECRET = 
    
    t2 = Twython (
            CONSUMER_KEY,
            CONSUMER_SECRET,
            ACCESS_TOKEN,
            ACCESS_SECRET
            )
    
    ACCESS_TOKEN = 
    ACCESS_SECRET = 
    CONSUMER_KEY = 
    CONSUMER_SECRET = 
    
    t3 = Twython (
            CONSUMER_KEY,
            CONSUMER_SECRET,
            ACCESS_TOKEN,
            ACCESS_SECRET
            )
    
    ACCESS_TOKEN = 
    ACCESS_SECRET =  
    CONSUMER_KEY = 
    CONSUMER_SECRET = 
    
    t4 = Twython (
            CONSUMER_KEY,
            CONSUMER_SECRET,
            ACCESS_TOKEN,
            ACCESS_SECRET
            )
    
    APIList = [t,t2,t3,t4];
    return APIList

def crawlSeedUsers()
    user_friends = t3.get_friends_ids(screen_name='GhostPentlandG').get('ids')
    seedUsers = ["Spotify","spotifyartists","SpotifyLatino","SpotifyUSA","SpotifyKDaebak","SpotifyUK","SpotifyCanada","SpotifySG","Spotify_PH","SpotifyMY","SpotifyAU","SpotifyNZ","SpotifyJP","SpotifyBR","spotifyfrance", \
                 "SpotifyMexico","AppleMusic"];
                 
    artist_list = [];
    for i in range(len(seedUsers)):
        print("getting friends for" + seedUsers[i])
        artist_list.append(t.get_friends_ids(screen_name=seedUsers[i]).get('ids'))
    
    
    artist_lists_id = []
    for i in range(len(artist_list)):
        tmp = artist_list[i]
        for j in range(len(tmp)):
            artist_lists_id.append(tmp[j])
            
    #Save list of artists so don't need to crawl again
    with open('Downloads/artist_ids.csv', 'w') as myfile:
        wr = csv.writer(myfile, dialect='excel')
        wr.writerow(artist_lists_id)


def getLocation():
    user_followers2 = user_followers
    user_followers.extend(user_followers2)
    
    
    for i in range(len(user_followers)):
        user_loc = (user_followers[i]).get('location')
        if not user_loc:
            continue
        else:
            n = nom.geocode(user_loc, language ='en')
            if n is not None:
                s = (n.raw['display_name']).split(',')
                country_code = s[-1].replace(' ','')
                print((user_followers[i]).get('screen_name') + " " + country_code)




def crawlArtists():

    with open('Downloads/artist_ids.csv', 'r') as f:
        reader = csv.reader(f)
        artist_lists_id = list(reader)
    artist_lists_id = artist_lists_id[0]
    
    shuffle(artist_lists_id)
    
    next_cursor = [-1,-1,-1,-1]
    path, dirs, files = next(os.walk("D:\Data\CS179G_Data"))
    file_count = len(files)
    i = [171,172,173,174]
    flag = [0,0,0,0]
    usersFollowing = []
    crawledUsers = []
    user_info = ""
    APIchooser = 0
    user_dict = [{},{},{},{}]
    while max(i) < (len(artist_lists_id)):
        print("i = " + str(i[APIchooser]) + ", next_cursor = " + str(next_cursor[APIchooser]))
        try:
            if(next_cursor[APIchooser] == -1):
                user_info = (APIList[APIchooser]).show_user(id=artist_lists_id[i[APIchooser]])
                user_dict[APIchooser] = {'Following_ScreenName':user_info['screen_name'],'Following': user_info['name']}
                print(user_dict[APIchooser])
            u = (APIList[APIchooser]).get_followers_list(id=artist_lists_id[i[APIchooser]],count=200,cursor=next_cursor[APIchooser])
            if u['next_cursor'] == 0 or flag[APIchooser] >= 50:
                crawledUsers.extend(artist_lists_id[i[APIchooser]])
                with open('D:/Data/CS179G_Data/CrawledUsers'+'.csv','a') as fd:
                    fd.write(str(artist_lists_id[i[APIchooser]]))
                    fd.write(', ')
                i[APIchooser] = max(i) + 1
                next_cursor[APIchooser] = -1
                flag[APIchooser] = 0
            else:
                next_cursor[APIchooser] = u['next_cursor']
            for j in range(len(u['users'])):
                (u['users'])[j].update(user_dict[APIchooser])
            usersFollowing.extend(u['users'])
            flag[APIchooser] = flag[APIchooser] + 1
        except TwythonError as e:
            print(e)
            if(str(e) == "Twitter API returned a 429 (Too Many Requests), Rate limit exceeded"):
                with open('D:/Data/CS179G_Data/RawData'+str(file_count)+'.json','w') as fout:
                        json.dump(usersFollowing, fout,indent =2)   
                file_count = file_count + 1
                print("i = " + str(i[APIchooser]) + ", next_cursor = " + str(next_cursor[APIchooser]))            
                if(APIchooser < 3):
                    APIchooser = APIchooser + 1
                else:
                    for clockStart in range(15*60):
                        time.sleep(1)
                    APIchooser = 0
                usersFollowing = [];
            else:
                if("WSAECONNRESET" in str(e) ):
                    time.sleep(5)
                else:
                    i[APIchooser] = max(i) + 1;
                    flag[APIchooser] = 0;
             
        
    with open('Downloads/CS179G_Data/RawData'+str(file_count)+'.json','w') as fout:
                    json.dump(usersFollowing, fout,indent =2)






