#!/usr/bin/env python3

import argparse

import requests
from bs4 import BeautifulSoup

org = "adoptium"
repo = "website-v2"
branch = "main"
# This is where we define users that should be skipped
excludedUsers = "eclipse-temurin-bot"

parser = argparse.ArgumentParser(
    description="List GitHub contributor usernames for a given file"
)
parser.add_argument(
    "--file",
    nargs="?",
    default="content/asciidoc-pages/docs/marketplace-policy.adoc",
    help="specify the relative path to a particular file",
)
args = parser.parse_args()

page = requests.get(
    "https://github.com/{org}/{repo}/contributors-list/{branch}/{args.file}".format(
        **locals()
    )
)
soup = BeautifulSoup(page.content, "html.parser")

contributors = soup.findAll("a")

for contributor in contributors:
    username = contributor.find("href")
    if not contributor.text.strip() in excludedUsers:
        print(contributor.text.strip())
