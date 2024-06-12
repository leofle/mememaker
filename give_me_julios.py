import os
import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

def download_image(url, folder_path, image_name):
    try:
        response = requests.get(url)
        response.raise_for_status()
        if response.status_code == 200:
            with open(os.path.join(folder_path, image_name), 'wb') as f:
                f.write(response.content)
            print(f"Downloaded {url}")
    except requests.exceptions.RequestException as e:
        print(f"Could not download {url}: {e}")

def get_image_urls(url, limit_per_page=50, num_pages=5):
    options = Options()
    options.headless = True
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    image_urls = []
    for page in range(1, num_pages + 1):
        page_url = f"{url}&page={page}"
        driver.get(page_url)
        
        # Give the page some time to load
        driver.implicitly_wait(10)
        
        # Parse the page content
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        
        images = soup.find_all('img', {'src': True})
        print(f"Found {len(images)} images on page {page}.")

        for img in images[:limit_per_page]:
            src = img['src']
            if src and src.startswith('http'):
                image_urls.append(src)
        
        print(f"Collected {len(image_urls)} image URLs so far.")
    
    driver.quit()
    return image_urls

def download_images(url, limit_per_page=50, num_pages=5):
    folder_path = 'memes_de_julio'
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    image_urls = get_image_urls(url, limit_per_page, num_pages)
    for i, url in enumerate(image_urls):
        download_image(url, folder_path, f"julio_{i+1}.jpg")

if __name__ == "__main__":
    base_url = 'https://www.gettyimages.es/search/2/image-film?phrase=julio+iglesias+julio+iglesias'
    download_images(base_url, limit_per_page=50, num_pages=5)
