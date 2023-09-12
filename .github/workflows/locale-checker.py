import os
import re
import subprocess

CONTENT_DIR = "content/asciidoc-pages"
REPO = "adoptium/adoptium.net"

# List of locale leads for each locale
locale_leads = {
    "de": "@hendrikebbers",
    "fr": "@xavierfacq",
    "zh-CN": "@zdtsw",
}


def get_shasum(file_path):
    with open(file_path, "r") as f:
        content = f.read()
        match = re.search(r":page-based-on:\s+(\S+)", content)
        return match.group(1) if match else None


def get_shasum_from_git(file_path):
    shasum = None
    if os.path.exists(file_path):
        shasum = os.popen(f"git log -1 --format=%H {file_path}").read().strip()
    return shasum


def addLocalizedShasum(english_shasum, locale, root):
    # Add the shasum to the localized file
    localized_file = os.path.join(root, f"index.{locale}.adoc")
    with open(localized_file, "r") as f:
        content = f.read()
        match = re.search(r":page-based-on:\s+(\S+)", content)
        if match:
            print(f"Updating {localized_file} with shasum {english_shasum}")
            content = content.replace(match.group(1), english_shasum)
            with open(localized_file, "w") as f:
                f.write(content)
        else:
            print(f"Adding shasum {english_shasum} to {localized_file}")
            with open(localized_file, "r") as f:
                content = f.readlines()

            # Find the line number where ':page-authors:' exists
            line_number = next(
                (
                    index
                    for index, line in enumerate(content)
                    if ":page-authors:" in line
                ),
                None,
            )

            # Insert shasum after the line with ':page-authors:'
            if line_number is not None:
                content.insert(line_number + 1, f":page-based-on: {english_shasum}\n")

            # Write the updated content back to the file
            with open(localized_file, "w") as f:
                f.writelines(content)


def main():
    for root, _, files in os.walk(CONTENT_DIR):
        english_file = os.path.join(root, "index.adoc")

        if "index.adoc" not in files:
            continue

        english_shasum = get_shasum_from_git(english_file)
        if not english_shasum:
            continue

        outdated_locales = []

        localized_file_pattern = re.compile(r"^index\..+\.adoc$")
        for localized_file in files:
            if localized_file_pattern.match(localized_file):
                file_path = os.path.join(
                    root.replace(".index.adoc", ""), localized_file
                )
                local_shasum = get_shasum(file_path)

                if local_shasum != english_shasum:
                    locale = localized_file.split(".")[1]
                    outdated_locales.append(locale)

        if outdated_locales:
            # Check if an issue already exists for this file
            check_issue = (
                os.popen(
                    # split this line into two to avoid a bug in the GitHub CLI
                    "gh issue list " +
                    f"-R {REPO} " +
                    f"--search 'Translation review required after updates to {os.path.relpath(english_file, CONTENT_DIR)}' " +
                    "--state open"
                )
                .read()
                .strip()
            )
            if check_issue:
                print(f"An issue already exists for {english_file}: {check_issue}")
                continue

            # Create an issue for this file
            print(f"Creating issue for {english_file}")

            title = f"Translation review required after updates to {os.path.relpath(english_file, CONTENT_DIR)}"

            body = "The English version of this file has been updated. "
            body += "The following localised versions are potentially out of date:\n\n"
            body += "```diff\n"
            body += f"- {english_shasum} (English latest)\n"
            for locale in outdated_locales:
                localized_shasum = get_shasum(
                    os.path.join(root, f"index.{locale}.adoc")
                )
                # If localized file is None then we need to create a pull request to add the shasum to the file
                if localized_shasum is None:
                    addLocalizedShasum(english_shasum, locale, root)
                # Add localized shasum to outdated_locales
                outdated_locales[
                    outdated_locales.index(locale)
                ] = f"{localized_shasum} {locale}"
                body += f"+ {localized_shasum} ({locale})\n"
            body += "```\n\n"
            body += f"View the Latest version of the file [here](https://github.com/{REPO}/blob/main/{english_file}).\n\n"
            body += "| Locale | File | Locale Lead |\n"
            body += "| ------ | ---- | ----------- |\n"
            for locale in outdated_locales:
                localized_shasum = locale.split(" ")[0].strip()
                locale = locale.split(" ")[1]
                # get locale lead
                locale_lead = locale_leads.get(locale)
                if locale_lead is None:
                    locale_lead = "n/a"
                body += f'| {locale} | [{f"index.{locale}.adoc"}](https://github.com/{REPO}/blob/main/{os.path.join(root, f"index.{locale}.adoc")}) | {locale_lead}\n'
            body += "\n"
            body += "---\n\n"

            for locale in outdated_locales:
                localized_shasum = locale.split(" ")[0]
                locale = locale.split(" ")[1]
                body += f"### View the changes to the English file since the last {locale} update\n\n"
                body += "<details>\n"
                body += "<summary>View Diff</summary>\n\n"
                # Generate diff between English file and the English version of the localized file
                body += "```diff\n"
                body += os.popen(
                    f"git diff {localized_shasum}..{english_shasum} -- {english_file}"
                ).read()
                body += "```\n\n"
                body += "</details>\n\n"

            # Generate Issue
            subprocess.run(
                [
                    "gh",
                    "issue",
                    "create",
                    "--repo",
                    REPO,
                    "--title",
                    title,
                    "--body",
                    body,
                    "--label",
                    "translation,help wanted",
                ]
            )


if __name__ == "__main__":
    main()
