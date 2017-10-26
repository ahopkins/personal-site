from medium import Client
import os
import glob
from bs4 import BeautifulSoup
from pathlib import Path


PATH = os.path.dirname(os.path.abspath(__file__))
MEDIUM = os.path.join(PATH, 'medium-published')

with open(os.path.join(PATH, 'KEYS', 'medium'), 'r') as file:
    application_id, application_secret, access_token = map(lambda x: x[:-1], list(file.readlines()))


class Article(object):
    def __init__(self, info):
        path, lock = info
        self.path = path
        self.lock_path = lock
        self._extract()

    def _extract(self):
        with open(self.path, 'r') as file:
            self.soup = BeautifulSoup(file.read(), 'html.parser')
        self.title = self.soup.title.string
        self.post = str(self.soup.find('section', class_='post'))

    def lock(self):
        Path(self.lock_path).touch()



def publish(article_path):
    article = Article(article_path)

    client = Client(application_id=application_id, application_secret=application_secret)
    client.access_token = access_token
    user = client.get_current_user()
    post = client.create_post(
        user_id=user.get('id'),
        title=article.title,
        content=article.post,
        content_format='html',
        publish_status='draft'
    )
    print('Done.')
    print(post.get('url'))
    print('')
    article.lock()



def main():
    print('')
    print('Articles')
    print('========')
    files = glob.iglob('2017/**/*.html', recursive=True)
    publishable = []
    for filename in files:
        parts = filename.split('/')
        title = parts[3][:-5]
        lock = os.path.join(MEDIUM, title)
        if not os.path.exists(lock):
            index = len(publishable)
            publishable.append((filename, lock))
            print('{}) {}'.format(index, filename, title))
    # input('Go here: {}'.format(auth_url))
    print('')

    if len(publishable) > 0:
        index = input('Select an article to publish [0]: ')
        if not index:
            index = 0

        article = publishable[int(index)]

        print('')
        print('Beginning to publish {}'.format(article))
        publish(article)
    else:
        print('No publishable articles')
        print('')


if __name__ == '__main__':
    main()
