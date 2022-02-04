#!/usr/bin/env python3

import argparse
from bs4 import BeautifulSoup
import requests

org = "adoptium"
repo = "website-v2"
branch = "main"

parser = argparse.ArgumentParser(description="List GitHub contributor usernames for a given file")
parser.add_argument(
    "--file",
    nargs="?",
    default="src/asciidoc-pages/docs/marketplace-policy.adoc",
    help="specify the relative path to a particular file",
)
args = parser.parse_args()

page = requests.get("https://github.com/{org}/{repo}/contributors-list/{branch}/{args.file}".format(**locals()))
soup = BeautifulSoup(page.content, "html.parser")

contributors = soup.findAll("a")

for contributor in contributors:
    username = contributor.find("href")
    print(contributor.text.strip())