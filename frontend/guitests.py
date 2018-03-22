from selenium import webdriver

driver = webdriver.Chrome("C:\webdrivers\chromedriver.exe")
# driver.get('http://homeswehome.me/')
driver.get('http://localhost:5000/')
driver.implicitly_wait(1000000000)
driver.find_element_by_link_text("Dogs").click()
driver.implicitly_wait(1000000000)
driver.find_element_by_id("40172988")
# driver.find_element_by_link_text("Parks").click()
# driver.implicitly_wait(1000000000)
# driver.find_element_by_link_text("Shelters").click()
# driver.implicitly_wait(1000000000)
# driver.implicitly_wait(10)