# JSON Config Files

## Members JSON file

This directory contains the `members.json` file which is used to populate the `/members` and `/sponsors` pages.

An example entry looks like this:

```json
{
  "name": "Microsoft",
  "logo": "microsoft.svg",
  "url": "https://microsoft.com",
  "tier": "strategic"
}
```

The `name` and `url` fields are faily self explantory. The `logo` field is where you specify the filename of the logo located in the [static folder](../../static).

There are currently five different options for `tier`:

- `strategic` - shows on `/members`
- `enterprise` - shows on `/members`
- `participant` - shows on `/members`
- `sponsor` - shows on `/sponsors` (lists all financial sponsors that aren't members)
- `infra` - shows on `/sponsors` (lists all infrastructure sponsors that aren't members)

## Marketplace JSON file

This directory also contains the `marketplace.json` file which is used by the `VendorSelector` component to create the vendor tiles in the marketpkace.

An example entry looks like this:

```json
{
  "name": "Adoptium",
  "icon": "vendor-adoptium.png",
  "postDownload": "https://link.to.post.download.page"
}
```

The `name` field is the name of the vendor which can include spaces. The `icon` field is the filename of the square vendor icon located inside the `static/images/vendors/` directory. The `postDownload` field is for adding a vendor specific link to be shown after a download.
