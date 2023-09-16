# 导入必要的库
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


def test_signup():
    driver.find_element(by='name', value='SignUp').click()
    driver.find_element(by='name', value='name').send_keys('test_name')
    driver.find_element(by='name', value='email').send_keys(
        'test_email@gmail.com')
    driver.find_element(by='name', value='password').send_keys('Password1')
    driver.find_element(
        by='name', value='confirmPassword').send_keys('Password1')

    try:
        driver.find_element(by='name', value='submit').click()
        print('Test Passed')
    except Exception as e:
        print('Test Failed')
        print(e)
        driver.quit()


def test_login():
    driver.find_element(by='name', value='email').send_keys(
        'test_email@gmail.com')
    driver.find_element(by='name', value='password').send_keys('Password1')
    try:
        driver.find_element(by='name', value='submit').click()
        print('Test Passed')
    except Exception as e:
        print('Test Failed')
        print(e)
        driver.quit()


# 创建一个Chrome浏览器实例
driver = webdriver.Chrome("")  # 将'/path/to/chromedriver'替换为您的Chrome驱动程序的实际路径

# 打开Google搜索页面
driver.get("http://localhost:3000")

# test_signup()
test_login()
time.sleep(5)  # 在这里等待5秒钟，您可以根据需要进行调整

# 关闭浏览器
driver.quit()
