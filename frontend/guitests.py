from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait

# driver = webdriver.Chrome("/Users/rebekkahkoo/Downloads/chromedriver")
driver = webdriver.Chrome()
driver.get('http://homeswehome.me/')
# driver.get('http://localhost:5000/')

'''
splash -> dogs model page -> dog details for Tic
-> Tic's shelter details page -> park nearby Tic details page
-> Parks model page -> park details page
-> shelter nearby park details page -> back to park details page
-> dog nearby park (Drakie) details page -> shelter models page
-> shelter details page -> neaby dog details page (Cappuccino) -> splash
'''
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
# driver.find_element_by_link_text("About").click()
driver.quit()
