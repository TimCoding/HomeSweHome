from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class GUITest(unittest.TestCase):
    def setUp(self):
        '''
        assumption: using firefox webdriver assuming machine running guitest.py
        has geckodriver installed and path is /path/to/geckodriver
        '''
        self.driver = webdriver.Firefox()
        # self.driver = webdriver.Chrome("/Users/rebekkahkoo/Downloads/chromedriver")
        self.driver.get('http://homeswehome.me/')
        # self.driver.get('http://localhost:5000/')

    def test_links(self):
        '''
        splash -> dogs model page -> dog details for Tic
        -> Tic's shelter details page -> park nearby Tic details page
        -> Parks model page -> park details page
        -> shelter nearby park details page -> back to park details page
        -> dog nearby park (Drakie) details page -> shelter models page
        -> shelter details page -> neaby dog details page (Cappuccino) -> splash
        '''
        driver = self.driver
        driver.find_element_by_link_text("Dogs").click()
        WebDriverWait(driver, 10).until(lambda x: x.find_element_by_link_text('Meet Tic'))
        driver.find_element_by_link_text('Meet Tic').click()
        WebDriverWait(driver, 10).until(lambda x: x.find_element_by_link_text("Adopt Me Please"))
        driver.find_element_by_link_text("Adopt Me Please").click()
        WebDriverWait(driver, 10).until(lambda x: x.find_element_by_link_text("Visit"))
        driver.find_element_by_link_text("Visit").click()
        driver.back()
        driver.forward()
        driver.find_element_by_link_text("Parks").click()
        WebDriverWait(driver, 10).until(lambda x: x.find_element_by_link_text("Visit"))
        driver.find_element_by_link_text("Visit").click()
        WebDriverWait(driver, 10).until(lambda x: x.find_element_by_link_text("Visit"))
        driver.find_element_by_link_text("Visit").click()
        driver.back()
        WebDriverWait(driver, 10).until(lambda x: x.find_element_by_link_text("Meet Drakie"))
        driver.find_element_by_link_text("Meet Drakie").click()
        driver.find_element_by_link_text("Shelters").click()
        WebDriverWait(driver, 10).until(lambda x: x.find_element_by_link_text("Visit"))
        driver.find_element_by_link_text("Visit").click()
        WebDriverWait(driver, 10).until(lambda x: x.find_element_by_link_text("Meet Cappuccino"))
        driver.find_element_by_link_text("Meet Cappuccino").click()
        driver.find_element_by_class_name("navbar-brand").click()
        driver.find_element_by_link_text("About").click()

    def tear_down(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
