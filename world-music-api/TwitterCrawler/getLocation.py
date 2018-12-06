import urllib3
import urllib3.request
from bs4 import BeautifulSoup

def getLocation():
    #nom = Nominatim("WorldMusicTwitter")
    http = urllib3.PoolManager()
    
    fileNum = 305
    while fileNum < 450:
        with open('D:/Data/CS179G_Data/RawData'+str(fileNum)+'.json') as f:
            data = json.load(f)
        
        list = []
        for i in range(len(data)):
            user_loc = (data[i]).get('location')
            if not user_loc:
                continue
            else:
                try:
                    user_loc = re.sub(r'[^a-zA-Z ]+', '', user_loc)
                    url = "http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address=" + user_loc
                    response = http.request('GET', url)
                    info = json.loads(response.data.decode('utf-8'))
                    if info.get('status') != 'ZERO_RESULTS':
                        try:
                            country = ((info.get('results'))[0].get('address_components')[1]).get('long_name')
                            country_code = ((info.get('results'))[0].get('address_components')[1]).get('short_name')
                            final_dict = {'username':(data[i]).get('screen_name'),'followingArtist': (data[i]).get('Following'),'country_code':country_code,'country':country}
                            list.append(final_dict)
                            print("file: " + str(fileNum) + ", at index: " + str(i) + ", user: " + (data[i]).get('screen_name') + ", country_code: " + country_code + ", country " + country)
                        except:
                            print("Error")
                except:
                    print("Large Error")

        with open('D:/Data/CS179G_Data/CleanData'+str(fileNum)+'.json','w') as fout:
                        json.dump(list, fout,indent =2)   
        fileNum = fileNum + 1
