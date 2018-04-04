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
        # driver = self.driver
        driver.find_element_by_link_text("Dogs").click()
        time.sleep(5)
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[2]/div[1]/div/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.perform()
        # tic
        driver.find_element_by_link_text('Meet Tic').click()
        WebDriverWait(driver, 10).until(lambda x: x.find_element_by_link_text("Adopt Me Please"))
        driver.find_element_by_link_text("Adopt Me Please").click()
        # town of addison
        time.sleep(5)
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[6]/div/div[1]/div/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.perform()
        #addison circle park
        driver.find_element_by_link_text("Visit").click()
        driver.back()
        driver.forward()
        driver.find_element_by_link_text("Parks").click()
        time.sleep(5)
        #bosque park
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[2]/div[2]/div/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.perform()
        driver.find_element_by_link_text("Visit").click()
        time.sleep(5)
        # drakie
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[5]/div/div[3]/div/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.perform()
        driver.find_element_by_link_text("Meet Drakie").click()
        driver.find_element_by_link_text("Shelters").click()
        time.sleep(5)
        # town of addison
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[2]/div[1]/div/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.perform()
        driver.find_element_by_link_text("Visit").click()
        time.sleep(5)
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[5]/div/div[4]/div/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.perform()
        driver.find_element_by_link_text("Meet Cappuccino").click()
        driver.find_element_by_class_name("navbar-brand").click()
        driver.find_element_by_link_text("About").click()
        driver.find_element_by_xpath("//*[@id='content']/div/div[1]/nav/form/input[1]").send_keys('velcro')
        driver.find_element_by_xpath("//*[@id='content']/div/div[1]/nav/form/input[2]").click()
        time.sleep(10)
        # driver.find_element_by_xpath("//*[@id='page-numbers']/li[7]/a/span[1]").click()
        # driver.find_element_by_xpath("//*[@id='80']").click
        element_to_hover_over = driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div[2]/div/div/div/div/div/img")
        hover = ActionChains(driver).move_to_element(element_to_hover_over)
        hover.perform()
        driver.find_element_by_link_text("Meet Velcro").click()

    # def tear_down(self):
    #     self.driver.quit()

# if __name__ == "__main__":
#     unittest.main()
