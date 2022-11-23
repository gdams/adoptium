# Locales Folder

This is the locales folder, it contains several json files which are used to map text on pages and components to their correctly translated equivalents. Currently there are 3 top level directories (one for each language that we support):

```tree
.
├── de
│   ├── download.json
│   ├── index.json
│   ├── language-selector.json
│   ├── marketplace.json
│   └── working-group.json
├── es
│   ├── index.json
│   ├── language-selector.json
│   └── marketplace.json
├── zh-CN
    ├── download.json
    ├── index.json
    ├── language-selector.json
    ├── marketplace.json
    ├── working-group.json
    └── temurin.json
```

Inside these directories are json files which can be named anything but it's best to name them in a way that they will be easily associated with the section of the site that is being translated. An example JSON file is shown below:

```json
{
    "Home": "Heim",
    "Prebuilt OpenJDK": "Vorgefertigtes OpenJDK",
    "Binaries for Free!": "Binaries Kostenlos!",
    "Intro": "Java™ ist die weltweit führende Programmiersprache und Plattform. Die Adoptium Working Group fördert und unterstützt qualitativ hochwertige, TCK-zertifizierte Laufzeiten und zugehörige Technologien für den Einsatz im gesamten Java-Ökosystem™. Eclipse Temurin ist der Name der OpenJDK-Distribution von Adoptium."
  }
```

The translations in this file can be used in one of two ways:

## `<Trans>foobar</Trans>`

The first way is to use the `<Trans>` function provided by `gatsby-plugin-react-i18next`

Make sure that the top of your `js`/`tsx` file imports the Trans function:

```js
import { Trans } from 'gatsby-plugin-react-i18next'
```

From there you can then use the function inside the React `return` block:

```js
<Trans>Prebuilt OpenJDK</Trans>
```

Note that the text has to match the string in the JSON file in order for this to work.

## useTranslation()

The second way is to use the `useTranslation()` function. This is recommended for blocks of large text and uses a keyword.

Make sure that the top of your `js`/`tsx` file imports the useTranslation function:

```js
import { useTranslation } from 'gatsby-plugin-react-i18next'
const { t } = useTranslation()
```

From there you can then use the function inside the React `return` block:

```js
<p>{t('Intro')}</p>
```

The function will search the JSON files for the `Intro` key and return the localized block of text.
