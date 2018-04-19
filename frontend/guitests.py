from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
from selenium.webdriver.common.action_chains import ActionChains
import unittest, time, re

driver = None 

class GUITest(unittest.TestCase):
    def setUp(self):
        '''
        assumption: using Chrome to run test; replace PATH_TO_CHROMEDRIVER
        with path to chromedriver on machine running guitests.py
        '''
        # self.driver = webdriver.Firefox()
        self.driver = webdriver.Chrome("C:\webdrivers\chromedriver.exe")
        # self.driver = webdriver.Chrome("/Users/rebekkahkoo/Downloads/chromedriver")

        self.driver.get('http://homeswehome.me/')
        # self.driver.get('http://localhost:5000/')

    def test_links(self):
        driver = self.driver
        driver.find_element_by_link_text("Dogs").click()
        time.sleep(5)
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[2]/div[1]/div/a/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.click(element_to_hover_over).perform()

        # tic: details page, petfinder website, back, go to town of addison
        time.sleep(2)
        driver.find_element_by_link_text("Visit this dog on PetFinder!").click()
        driver.back()
        driver.find_element_by_link_text("Visit this Shelter").click()

        # town of addison: go to shelter on petfinder website, back, go to addison circle park
        time.sleep(2)
        driver.find_element_by_link_text("Visit this shelter on PetFinder!").click()
        driver.back()
        time.sleep(2)
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[6]/div/div[1]/div/a/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.click(element_to_hover_over).perform()

        #addison circle park: go to yelp page, back, go to parks model page
        time.sleep(2)
        driver.find_element_by_link_text("Visit this park on Yelp!").click()
        driver.back()

        #parks
        driver.find_element_by_link_text("Parks").click()
        time.sleep(3)

        #bosque park: go to town of addison visit
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[2]/div[2]/div/a/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.click(element_to_hover_over).perform()
        time.sleep(3)

        # drakie
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[5]/div/div[3]/div/a/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.click(element_to_hover_over).perform()
        time.sleep(1)
        driver.find_element_by_link_text("Shelters").click()
        time.sleep(3)

        # town of addison
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[2]/div[1]/div/a/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.click(element_to_hover_over).perform()
        time.sleep(3)

        # cappucino
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[5]/div/div[4]/div/a/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.click(element_to_hover_over).perform()

        # home
        driver.find_element_by_class_name("navbar-brand").click()

    def test_search(self):
        # specific dog search test: Velcro
        driver = self.driver
        driver.find_element_by_xpath("//*[@id='content']/div/div[1]/nav/form/input[1]").send_keys('velcro')
        driver.find_element_by_xpath("//*[@id='content']/div/div[1]/nav/form/input[2]").click()
        time.sleep(2)
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[3]/div[2]/div/div/div/div/a/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.click(element_to_hover_over).perform()

    def test_filters(self):
        # dogs filter test: order by: z - a, cities: houston, breeds: pug, reset
        driver = self.driver
        driver.find_element_by_link_text("Dogs").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/div/button").click()
        driver.find_element_by_xpath("//*[@id='ASC']").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/div/button").click()
        driver.find_element_by_xpath("//*[@id='DESC']").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='react-select-3--value']/div[1]").click()
        driver.find_element_by_xpath("//*[@id='react-select-3--option-7']").click()
        driver.find_element_by_xpath("//*[@id='react-select-3--value']/div[1]").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='react-select-2--value']/div[1]").click()
        driver.find_element_by_xpath("//*[@id='react-select-2--option-76']").click()
        driver.find_element_by_xpath("//*[@id='react-select-2--value']/div[1]").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[4]/button").click()

        # parks filter test: click order by: a-z , z-a, highest-lowest rating, and lowest-highest rating,
        # click ratings: 5 stars and up, 1 star and up, click cities: comfort and calliham, reset
        driver.find_element_by_link_text("Parks").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/div/button").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/div/div/button[1]").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/div/button").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[3]/div/div/button[2]").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[4]/div/button").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[4]/div/div/div/button[2]").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[4]/div/button").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[4]/div/div/div/button[1]").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[2]/div/button").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[2]/div/div/button[1]").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[2]/div/button").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[2]/div/div/button[5]").click()
        time.sleep(1)
        driver.find_element_by_xpath("//*[@id='react-select-2--value']/div[1]").click()
        driver.find_element_by_xpath("//*[@id='react-select-2--option-7']").click()
        driver.find_element_by_xpath("//*[@id='react-select-2--option-3']").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[5]/button").click()

        # shelters filter test: click order by: z-a, and a-z, cities: Carrollton, reset
        driver.find_element_by_link_text("Shelters").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[2]/div/button").click()
        driver.find_element_by_xpath("//*[@id='DESC']").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[1]/div[2]/div/button").click()
        driver.find_element_by_xpath("//*[@id='ASC']").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='react-select-2--value']/div[1]").click()
        driver.find_element_by_xpath("//*[@id='react-select-2--option-4']").click()
        time.sleep(2)
        driver.find_element_by_xpath(" //*[@id='content']/div/div[2]/div[1]/div[3]/button").click()

    def test_pagination(self):
        # pagination test: search ad, click last page arrow, click 34, click 32, hover over 2nd dog,
        # click samantha
        driver = self.driver
        driver.find_element_by_xpath("//*[@id='content']/div/div[1]/nav/form/input[1]").send_keys('aD')
        driver.find_element_by_xpath("//*[@id='content']/div/div[1]/nav/form/input[2]").click()
        time.sleep(3)
        driver.find_element_by_xpath("//*[@id='page-numbers']/li[7]/a").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='page-numbers']/li[4]/a").click()
        time.sleep(2)
        driver.find_element_by_xpath("//*[@id='page-numbers']/li[2]/a").click()
        time.sleep(2)
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[3]/div[2]/div/div/div[2]/div/a/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.click(element_to_hover_over).perform()

        # about page
        time.sleep(2)
        driver.find_element_by_link_text("About").click()

    def tear_down(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
