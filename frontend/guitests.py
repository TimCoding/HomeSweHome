from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
from selenium.webdriver.common.action_chains import ActionChains
import unittest, time, re

class GUITest(unittest.TestCase):
    # def setUp(self):
        '''
        assumption: using firefox webdriver assuming machine running guitest.py
        has geckodriver installed and path is /path/to/geckodriver
        '''
        # self.driver = webdriver.Firefox()
        driver = webdriver.Chrome("C:\webdrivers\chromedriver.exe")
        # self.driver = webdriver.Chrome("/Users/rebekkahkoo/Downloads/chromedriver")
        # self.driver.get('http://homeswehome.me/')
        driver.get('http://localhost:5000/')

    # def test_links(self):
        '''
        splash -> dogs model page -> dog details for Tic
        -> Tic's shelter details page -> park nearby Tic details page
        -> Parks model page -> park details page
        -> shelter nearby park details page -> back to park details page
        -> dog nearby park (Drakie) details page -> shelter models page
        -> shelter details page -> neaby dog details page (Cappuccino) -> splash
        '''
        # # driver = self.driver
        driver.find_element_by_link_text("Dogs").click()
        time.sleep(5)
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[2]/div[1]/div/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.perform()
        # tic: details page, petfinder website, back, go to town of addison
        driver.find_element_by_link_text("Meet Tic").click()
        time.sleep(2)
        driver.find_element_by_link_text("Visit this dog on PetFinder!").click()
        driver.back()
        driver.find_element_by_link_text("Visit this Shelter").click()

        # town of addison: go to shelter on petfinder website, back, go to addison circle park
        time.sleep(2)
        driver.find_element_by_link_text("Visit this shelter on PetFinder!").click()
        driver.back()
        time.sleep(2)        
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[6]/div/div[1]/div/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.perform()

        #addison circle park: go to yelp page, back, go to parks model page
        driver.find_element_by_link_text("Visit").click()
        time.sleep(2)
        driver.find_element_by_link_text("Visit this park on Yelp!").click()
        driver.back()
        driver.find_element_by_link_text("Parks").click()
        time.sleep(3)

        #bosque park: go to town of addison visit
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[2]/div[2]/div/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.perform()
        driver.find_element_by_link_text("Visit").click()
        time.sleep(3)

        # drakie
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[5]/div/div[3]/div/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.perform()
        driver.find_element_by_link_text("Meet Drakie").click()
        driver.find_element_by_link_text("Shelters").click()
        time.sleep(3)

        # town of addison
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[2]/div[1]/div/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.perform()
        driver.find_element_by_link_text("Visit").click()
        time.sleep(3)

        # cappucino
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[5]/div/div[4]/div/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.perform()
        driver.find_element_by_link_text("Meet Cappuccino").click()
        # home 
        driver.find_element_by_class_name("navbar-brand").click()

        # specific dog search test: Velcro
        driver.find_element_by_xpath("//*[@id='content']/div/div[1]/nav/form/input[1]").send_keys('velcro')
        driver.find_element_by_xpath("//*[@id='content']/div/div[1]/nav/form/input[2]").click()
        time.sleep(2)
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[3]/div[2]/div/div/div/div/div[1]/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.perform()
        driver.find_element_by_link_text("Meet Velcro").click()

        # dogs filter test: order by: z - a, cities: houston, breeds: pug, reset
        driver.find_element_by_link_text("Dogs").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/button").click()
        driver.find_element_by_xpath("//*[@id='ASC']").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/button").click()
        driver.find_element_by_xpath("//*[@id='DESC']").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[2]/button").click()
        driver.find_element_by_name("Houston").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[2]/button").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[1]/button").click()
        driver.find_element_by_name("Pug").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[1]/button").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/button").click()
        
        # parks filter test: click order by: a-z , z-a, highest-lowest rating, and lowest-highest rating,
        # click ratings: 5 stars and up, 1 star and up, click cities: comfort and calliham, reset
        driver.find_element_by_link_text("Parks").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/button").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/div/button[1]").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/button").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/div/button[2]").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/button").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/div/button[4]").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/button").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/div/button[3]").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[2]/button").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[2]/div/button[1]").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[2]/button").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[2]/div/button[5]").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[1]/button").click()
        driver.find_element_by_name("Comfort").click()
        driver.find_element_by_name("Calliham").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[1]/button").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/button")

        # shelters filter test: click order by: z-a, and a-z, cities: Carrollton, reset
        driver.find_element_by_link_text("Shelters").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[2]/button").click()
        driver.find_element_by_xpath("//*[@id='DESC']").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[2]/button").click()
        driver.find_element_by_xpath("//*[@id='ASC']").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[1]/button").click()
        driver.find_element_by_name("Carrollton").click()
        time.sleep(2)
        driver.find_element_by_xpath(" //*[@id='content']/div/div[2]/div[1]/button").click()
       
        # pagination test: search ad, click last page arrow, click 34, click 32, hover over 2nd dog,
        # click samantha
        driver.find_element_by_xpath("//*[@id='content']/div/div[1]/div[1]/nav/form/input[1]").send_keys('aD')
        driver.find_element_by_xpath("//*[@id='content']/div/div[1]/div[1]/nav/form/input[2]").click()
        time.sleep(3)
        driver.find_element_by_xpath("//*[@id='page-numbers']/li[7]/a").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='page-numbers']/li[4]/a").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='page-numbers']/li[2]/a").click()
        time.sleep(2)
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[3]/div[2]/div/div/div[2]/div/div[1]/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.perform()
        driver.find_element_by_link_text("Meet Samantha").click()

        # about page
        time.sleep(2)
        driver.find_element_by_link_text("About").click()

    # def tear_down(self):
    #     self.driver.quit()

# if __name__ == "__main__":
#     unittest.main()
