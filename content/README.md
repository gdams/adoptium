# Adding Content

There are two different types of content; Blogs and Documentation. For adding/modifying documentation please see the seperate [README](./asciidoc-pages/README.md). For Blogs please review the steps below:

1. Create a folder in `blog` that is named after your post's title. [Slugify](https://blog.tersmitten.nl/slugify/) the title if it's more than a single word. Example: `hello-world`.
2. Create a file called `index.md` in the directory you just created (`blog/hello-world`).
3. Add the required metadata at the beginning of the file

    ```markdown
    ---
    title: Hello World
    date: "2020-04-21T12:20:00+00:00"
    author: janedoe
    featuredImage: "./featured_image.png" (optional)
    ---
    ```

    `title` is the title of your post as it appears on the site. `date` is the ISO 8601 timestamp of the publication date (`date -u +"%Y-%m-%dT%H:%M:%SZ"` generates that for you on the command-line) and `author` the identifier of the author as specified in the `authors.json`. `featuredImage` (optional) the relative path to the featured image.
4. Write your post in Markdown. Save any images in the folder of your post alongside the `index.md`. Put the biggest resolution in there that you have. Responsive images will automatically be generated for you.

To preview your post, start the local development server by running `gatsby develop` in the root directory of the repository.

**WARNING**: The RSS feed is only generated in production mode: `gatsby build && gatsby serve`.

## Editing Conventions

### Excerpts

On the front page, we only display excerpts and not full posts. By default, Gatsby will shorten your post automatically, which might yield unsatisfactory results. To control that behaviour, add a field `description` with the text you want to see on the front page in the frontmatter of your post (metadata delimited with `---` at the beginning of your post).

### Images with Captions

To add captions to your images, use the following structure:

```markdown
![Alt text](./image.jpg)
*Your caption here* 
```

Our CSS will take care of rendering it correctly by looking for `img + em`.

Example:

```markdown
![Photo depiciting a drop of water](./clean-drop-of-water-liquid.jpg)
*AQA v1.0  is a first drop in an on-going series of improvements.* 
```

### Quotes

```markdown
> Quote
> 
> <cite>Name of the person</cite>
```

Example:

```markdown
> When the Well is Dry, We’ll Know the Worth of Water.
> 
> <cite>Benjamin Franklin</cite>
```

### Guest Posts

Right after the front matter, add the following snippet to introduce the person that wrote the post:

```markdown
<GuestPost>
    Some introductory text
</GuestPost>
```

This is going to render as:

```html
<p className="guestpost">
    <em>Some introductory text – Adoptium Team</em>
</p>
```

Example:

```markdown
<GuestPost>
    This a guest post by [Mark Weitzel](https://www.linkedin.com/in/weitzelm/), General Manager, New Relic One at New Relic.
</GuestPost>
```

This will render the following section at the top of the blog post:

![Guest Post example](https://user-images.githubusercontent.com/20224954/204316138-cfd7cdbe-6727-4579-8dd0-443ba2435c41.png)

## Adding Authors

1. Create an entry in [`src/json/authors.json`](../src/json/authors.json). The schema uses this structure:

    ```json
    {
        "janedoe": {
            "name": "Jane Doe",
            "summary": "Some info about Jane",
            "twitter": "Jane's Twitter handle",
            "github": "Jane's GitHub username"
        }
    }
    ```

2. Your profile picture comes from GitHub but this can be changed by adding a profile picture in `static/images/authors`. If the key in the `authors.json` is `janedoe`, name the image file `janedoe.jpg`.
