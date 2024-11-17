"use strict";(self.webpackChunkadoptium_website=self.webpackChunkadoptium_website||[]).push([[759],{1128:function(e,t,n){n.r(t),n.d(t,{Head:function(){return v},default:function(){return k},formatDiv:function(){return A}});var a=n(8453),l=n(6540);function i(e){const t=Object.assign({p:"p",h2:"h2",h3:"h3",a:"a",ul:"ul",li:"li",span:"span"},(0,a.RP)(),e.components);return l.createElement(l.Fragment,null,l.createElement(t.p,null,"Recently JDK17 and JDK21 reproducible comparison builds have been enabled in Adoptium CI Jenkins, which aids in creating JDKs that work as intended across different environments and platforms. In this article we’ll explore why reproducible comparison builds are essential, how we implemented them and what we will do next."),"\n",l.createElement(t.h2,null,"Why Reproducibility Matters"),"\n",l.createElement(t.h3,null,"Confidence in the high quality of the process to create the binaries"),"\n",l.createElement(t.p,null,"Reproducibility refers to the ability to recreate a software build consistently, bit by bit, regardless of the time or location. Being able to repeatedly build the same OpenJDK source in an identical manner, producing identical JDK binaries, shows confidence and quality in the production process",l.createElement("sup",null,"[",l.createElement(t.a,{href:"https://adoptium.net/blog/2022/06/adoptium-reproducible-builds/"},"1"),"]"),"."),"\n",l.createElement(t.h3,null,"Secure Software Development"),"\n",l.createElement(t.p,null,"The Adoptium project produces high quality Java runtimes for use in mission-critical environments. It is important to the project and our users that the software we deliver is both safe and secure. An important part of Adoptium’s secure engineering practice is for community members to be able to verify the builds we produce. This is made possible by having binary verified reproducible builds, meaning that with the same sources, tools, and machine configuration anyone can produce a byte-for-byte identical result",l.createElement("sup",null,"[",l.createElement(t.a,{href:"https://adoptium.net/docs/secure-software/"},"2"),"]"),"."),"\n",l.createElement(t.h2,null,"Why Comparison Builds are Essential"),"\n",l.createElement(t.p,null,"Now that we understand the significance of reproducibility, let’s dive into the importance of tracking reproducibility."),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,"\n",l.createElement(t.p,null,"Security Auditing - In the context of security, comparison builds are essential for verifying that security patches have been applied correctly and that no new vulnerabilities have been introduced."),"\n"),"\n",l.createElement(t.li,null,"\n",l.createElement(t.p,null,"Regressions Caused by Changes to Build Process or Dependencies - While we are comparing 2 builds built from identical source, we also know that many other factors can impact whether 2 builds are identical. For example, if a different version of a compiler is used, or other implicit inputs to the build pipeline, these changes can directly affect whether 2 builds are identical. Comparison builds help in detecting these types of regressions—instances where build script or dependency changes can break reproducibility."),"\n"),"\n",l.createElement(t.li,null,"\n",l.createElement(t.p,null,"Quality Assurance - Comparison builds allows developers and quality assurance teams to identify discrepancies or unexpected changes between different builds of the same software. This helps ensure that the software’s behavior remains consistent throughout its development lifecycle and helps speed up triage of new problems or failures."),"\n"),"\n"),"\n",l.createElement(t.h2,null,"Reproducible Comparison Builds in Adoptium"),"\n",l.createElement(t.p,null,"At Eclipse Adoptium extensive work has been done to achieve identical OpenJDK binaries, has involved in-depth build comparison debugging to identify non-deterministic build issues. There are more variations expected to be seen to affect the reproducibility.\nCurrently the reproducible comparison builds are at an early stage, which rebuild the nightly JDK binaries with stringent controls, compare the two JDKs and generate the diff results with unreproducible files excluded.\nTo be specific, the Adoptium JDK binary is built by a jenkins job with stringent controls and a Software Bill of Materials (SBOM) is generated at the same time. The SBOM includes the secure hashes (SHAs) of all the component parts, the versions and SHAs of dependent components and the tooling. By parsing the jenkins job parameters and SBOM a duplicate JDK binary build of jenkins job can be easily triggered. Based on this, dedicated reproducible jenkins jobs per jdk version and platform are set up by the ",l.createElement(t.a,{href:"https://github.com/adoptium/ci-jenkins-pipelines/blob/master/tools/reproduce_comparison/Jenkinsfile"},"Jenkinsfile")," and are triggered correspondingly by nightly jdk binary build jobs."),"\n",l.createElement(t.p,null,"The job does:"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,"\n",l.createElement(t.p,null,"Copy nightly jdk binary build’s JDK and SBOM"),"\n"),"\n",l.createElement(t.li,null,"\n",l.createElement(t.p,null,"Parse the nightly jdk binary build’s parameters( e.g. build configurations) and SBOM"),"\n"),"\n",l.createElement(t.li,null,"\n",l.createElement(t.p,null,"Trigger a second jdk binary build with exactly the same build stringent controls on different agent (only if jdk is not built-in docker)"),"\n"),"\n",l.createElement(t.li,null,"\n",l.createElement(t.p,null,"Call the jdk reproducible comparison process in ",l.createElement(t.a,{href:"https://github.com/adoptium/temurin-build/tree/master/tooling"},"temurin-build")," (pre steps are done to ensure all files are comparable) and archive the results."),"\n"),"\n"),"\n",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 720px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/d2016b0943b7eb897cf4023a49d8cb96/874d1/buildFlow.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 43.333333333333336%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAABp0lEQVR42pWR608TURDF9///H/ygfpBEjZYIrW0DrUoXSgsrhbJ9P9iWfZTtdrfdbh+7PwcEY4wJOslkcu69c+6cOQp/ic12S3Noc9E20AcWPSvA8eb8SyhxHJMkCfd1s9nIUUIYrdj9ovHiXZY3+98o1EY0R55cJc8TZkvf+ZhXOazoaP0pQ3tGJISposbb/CmZkwafVJ2LrsV2s35sE+Ik/lmf8hErOxmVV6kiO+kSasulNfaJRXL7xqJt2JjeEuNujuvPMcwJNSG+7FnyzsMLFlwPbK76Dg3ps6ZzlJxMmD3S2C/KNFK7Y5dVtGS2iHD8JZYbMHZm+Isllx2DPfWatEx90rS5dabkK02yp23K3RmdWw/FmojMkYlpu9iuzyKMHiR/LtV4f3AmknUy5RZlfUQwXxAs1/jhSj6IHsybCw4Ee0FItFqjZNQrWfwRaalng4D60CUMQ3LHdV6mDslXO+SqXc47jngSP2/Kh4OK7LDA690CX+sm9RuPzXpFy5hQ1Q205ohqw6Bvek92/Mo/8X0qmt5DPdc51nRZruzlLvjt+f/HD/e1n7A0lT48AAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Build flow"\n        title=""\n        src="/static/d2016b0943b7eb897cf4023a49d8cb96/37523/buildFlow.png"\n        srcset="/static/d2016b0943b7eb897cf4023a49d8cb96/e9ff0/buildFlow.png 180w,\n/static/d2016b0943b7eb897cf4023a49d8cb96/f21e7/buildFlow.png 360w,\n/static/d2016b0943b7eb897cf4023a49d8cb96/37523/buildFlow.png 720w,\n/static/d2016b0943b7eb897cf4023a49d8cb96/302a4/buildFlow.png 1080w,\n/static/d2016b0943b7eb897cf4023a49d8cb96/874d1/buildFlow.png 1310w"\n        sizes="(max-width: 720px) 100vw, 720px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}}),"\n",l.createElement(t.p,null,"Build parameters are as follows\n",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 720px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/72085d8b8d5d4820b00b727eb060b1bf/af975/parameter.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 54.44444444444444%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAA9ElEQVR42p2T526EQAyEef+3vEt+HWV7Y8vEtsTpUhVY6ZMXCw3jwqS1xboqzPNKcSM0rPXwPkIpgxgzSqn/ZgId5zzu9zcSCfyIMQauHhFMKeN2e8e2GRJPpxx9c8hmWHBZNinRGIe9NrTeLzEZk5ByQSZa6+iU5JKZ3s8zsQg7fDxmYiGHFrVWgcUv9bCUnfqnoLSmHjo472VQKWdy3U7xSZDXZd/rc8rjAiLIIsZaaGPEWaUv/UX7IR53EcylYKGl3hSVTLt49O63bRwvcXzJPUteqWRG0VC0NlS+Q4hRIvc0hCDu+e6PvON8lB8ipSTvfwDojF9y7HiplgAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Build parameters"\n        title=""\n        src="/static/72085d8b8d5d4820b00b727eb060b1bf/37523/parameter.png"\n        srcset="/static/72085d8b8d5d4820b00b727eb060b1bf/e9ff0/parameter.png 180w,\n/static/72085d8b8d5d4820b00b727eb060b1bf/f21e7/parameter.png 360w,\n/static/72085d8b8d5d4820b00b727eb060b1bf/37523/parameter.png 720w,\n/static/72085d8b8d5d4820b00b727eb060b1bf/302a4/parameter.png 1080w,\n/static/72085d8b8d5d4820b00b727eb060b1bf/07a9c/parameter.png 1440w,\n/static/72085d8b8d5d4820b00b727eb060b1bf/af975/parameter.png 2478w"\n        sizes="(max-width: 720px) 100vw, 720px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}})),"\n",l.createElement(t.p,null,"Build results or artifacts\n",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 720px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/264c3b1a48ae5767026c80cd893d3b24/2215f/result.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 35%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAABYlAAAWJQFJUiTwAAABBUlEQVR42q2R226DMBBE8/9/1qoq4hJCgFRVH5KSGgiYu9eerm0q9bnqSkczxssyNgchBJ6fXhBFRwRBiJg1y3LkeYHT6YwwTJAkKdI0QxynKMs3RPzM9hbFhSkRvIbcm0EphQO4iIjRTrU2jPdKkfPGaLdv1/Yly8++V7+25QYag38rP9Cl4GQ8mC2IjcX8daC9o89KoO4J12bDbUdOhHUzWBwa06p/KX+UzH5cvg7ygdzAum4wDhLn9xrHjwXldcb9saFqN4hOOa1aBdErNEzN3B8K40wY5AjZD7jcFnx1+0/xxyY03YRGEtqB0E8eOXvtRs8wa06und8UJ11WrOvGPT79NyGaHP7v38jsAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Build results"\n        title=""\n        src="/static/264c3b1a48ae5767026c80cd893d3b24/37523/result.png"\n        srcset="/static/264c3b1a48ae5767026c80cd893d3b24/e9ff0/result.png 180w,\n/static/264c3b1a48ae5767026c80cd893d3b24/f21e7/result.png 360w,\n/static/264c3b1a48ae5767026c80cd893d3b24/37523/result.png 720w,\n/static/264c3b1a48ae5767026c80cd893d3b24/302a4/result.png 1080w,\n/static/264c3b1a48ae5767026c80cd893d3b24/07a9c/result.png 1440w,\n/static/264c3b1a48ae5767026c80cd893d3b24/2215f/result.png 1548w"\n        sizes="(max-width: 720px) 100vw, 720px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}})),"\n",l.createElement(t.p,null,"Currently enabled comparison builds platforms for both jdk17 & jdk21 are linux-x64, linux-ppc64le, linux-s390x, linux-aarch64, windows-x64, mac-x64 and mac-aarch64.\n",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 720px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/3bda4665ea8ab7f2533c19da6949886b/3e096/builds.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 33.888888888888886%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAABYlAAAWJQFJUiTwAAAA5klEQVR42nWRiY7DIAxE+f9P7QbacIXD9tQme0TaNNKIgRjzRnYyClrvmCTYCyEdhFhP7fXPtyG4+0SPY4xIKeOZCY5LRm0H+mT4NPVwYosTXhVU2356+0cs2uC/QgjYvh54ao2TWvX1AVLCpCS18VrzwRcR+uBbQmZG1R5Ec6V0UgqOfqzNiqexLbr5V/7R1JrPDXNO6z5piZvasGnkMQlBkU2GbnGtkf9ebf8xsvcIr4yi6VzlDh5dkc94pdEl8umt0LzI3VBkDcUo7a4rQ+kWISsZ/VLZcIz06uV+0DoUjz1ZD+ANmn4j3d8w18EAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Enabled builds"\n        title=""\n        src="/static/3bda4665ea8ab7f2533c19da6949886b/37523/builds.png"\n        srcset="/static/3bda4665ea8ab7f2533c19da6949886b/e9ff0/builds.png 180w,\n/static/3bda4665ea8ab7f2533c19da6949886b/f21e7/builds.png 360w,\n/static/3bda4665ea8ab7f2533c19da6949886b/37523/builds.png 720w,\n/static/3bda4665ea8ab7f2533c19da6949886b/302a4/builds.png 1080w,\n/static/3bda4665ea8ab7f2533c19da6949886b/07a9c/builds.png 1440w,\n/static/3bda4665ea8ab7f2533c19da6949886b/3e096/builds.png 1718w"\n        sizes="(max-width: 720px) 100vw, 720px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}})),"\n",l.createElement(t.h2,null,"Monitoring - How to use it"),"\n",l.createElement(t.p,null,"The build provides three artifacts, one original JDK, one rebuilt JDK and the diff results of those two JDKs. Job status is as following:"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,"\n",l.createElement(t.p,null,"SUCCESS - second rebuilt jdk is 100% identical to the first nightly built jdk"),"\n"),"\n",l.createElement(t.li,null,"\n",l.createElement(t.p,null,"UNSTABLE - there are difference between the second rebuilt jdk and the first nightly built jdk"),"\n"),"\n",l.createElement(t.li,null,"\n",l.createElement(t.p,null,"FAILURE - any unexpected failures ( jenkins failure, script failure, especially incomparable files)"),"\n"),"\n"),"\n",l.createElement(t.p,null,"Nightly rebuilding and comparison helps validate secure jdk. It can also notify developers instantly when regressions occur, which is easier for developers to find out what caused the regression when it is spotted early."),"\n",l.createElement(t.h2,null,"Next Steps"),"\n",l.createElement(t.p,null,"The current reproducible comparison is the first step of reproducibility comparison, which focuses on the reproducibility of JDKs. That is, compare two JDK binaries directly with a well defined metric (exclude the non reproducible files), which can be enhanced by:"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,"Report results to Slack so job can be monitored instantly"),"\n",l.createElement(t.li,null,"Add both JDKs build URL as the build description to be more user friendly so it’s easy to debug if needed"),"\n"),"\n",l.createElement(t.p,null,"Going forward we will also need to think about the Comparability as there are always non-deterministic factors for the JDK builds besides there is an intentional variation of build parameters, such as vendor strings. Our next steps are to fine-tune the ",l.createElement(t.a,{href:"https://github.com/adoptium/ci-jenkins-pipelines/blob/master/tools/reproduce_comparison/Jenkinsfile"},"jenkins jobs")," and update the script in ",l.createElement(t.a,{href:"https://github.com/adoptium/temurin-build/tree/master/tooling"},"temurin-build"),"jenkins jobs to work with following not limited to different scenarios:"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,"\n",l.createElement(t.p,null,"Support comparison with different metric",l.createElement("sup",null,"[",l.createElement(t.a,{href:"https://reproducible-builds.org/citests/"},"3"),"]")),"\n"),"\n",l.createElement(t.li,null,"\n",l.createElement(t.p,null,"Parameterize the incomparable files"),"\n"),"\n",l.createElement(t.li,null,"\n",l.createElement(t.p,null,"Compare JDKs built with different build parameters"),"\n"),"\n",l.createElement(t.li,null,"\n",l.createElement(t.p,null,"Compare JDKs from other sources - for example, URL"),"\n"),"\n"),"\n",l.createElement(t.h3,null,"References:"),"\n",l.createElement(t.p,null,"[1] ",l.createElement(t.a,{href:"https://adoptium.net/blog/2022/06/adoptium-reproducible-builds/"},"Reproducible Builds at Eclipse Adoptium")),"\n",l.createElement(t.p,null,"[2] ",l.createElement(t.a,{href:"https://adoptium.net/docs/secure-software/"},"Adoptium® Secure Software Development Practices")),"\n",l.createElement(t.p,null,"[3] ",l.createElement(t.a,{href:"https://reproducible-builds.org/citests/"},"Reproducible builds")))}var r=function(e={}){const{wrapper:t}=Object.assign({},(0,a.RP)(),e.components);return t?l.createElement(t,e,l.createElement(i,e)):i(e)},s=n(4755),o=n(1197),c=n(5895),d=n(8297),p=n(720),u=n(9694),b=n(548),m=n(1169),h=n(1939),g=n(9122),f=n(279);function y(){return y=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)({}).hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},y.apply(null,arguments)}const A=e=>e.dangerouslySetInnerHTML.__html.includes('class="language-text"')?l.createElement("code",e):l.createElement("div",e),w={GuestPost:u.A,blockquote:e=>l.createElement("blockquote",y({style:{paddingLeft:"1.5rem",borderLeft:".3rem solid hsla(0,0%,0%,0.9)"},className:"blockquote"},e)),table:e=>l.createElement("table",y({className:"table table-hover"},e)),thead:e=>l.createElement("thead",y({className:"table-dark"},e)),li:e=>l.createElement("li",y({style:{marginBottom:"1.5em"}},e)),img:e=>l.createElement(f.A,e),div:A},E=({data:e,pageContext:t,location:n,children:i})=>{const r=e.mdx,{previous:c,next:u}=t,f=p[r.frontmatter.author],y=r.frontmatter.tags;return l.createElement(o.A,null,l.createElement("section",{className:"py-5 container"},l.createElement("div",{className:"row py-lg-5"},l.createElement("div",{className:"col-lg-9 col-md-9 mx-auto"},l.createElement("article",null,l.createElement("header",{className:"pb-5"},l.createElement("h1",{className:"mb-0",style:{fontWeight:"900"}},r.frontmatter.title),l.createElement(b.A,{date:r.frontmatter.date,author:f.name,identifier:r.frontmatter.author}),l.createElement(m.A,{location:n,siteMetadata:e.site.siteMetadata,post:r.frontmatter})),l.createElement(a.xA,{components:w},i),l.createElement(h.A,{tags:y}),l.createElement(g.A,null),l.createElement("hr",{className:"p-3"}),l.createElement("footer",{className:"pb-5"},l.createElement(d.Ay,{identifier:r.frontmatter.author,author:f}))),l.createElement("div",null,l.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},l.createElement("li",null,u&&l.createElement(s.Link,{to:u.fields.postPath,rel:"next"},"← ",u.frontmatter.title)),l.createElement("li",null,c&&l.createElement(s.Link,{to:c.fields.postPath,rel:"prev"},c.frontmatter.title," →"))))))))};function k(e){return l.createElement(E,e,l.createElement(r,e))}const v=({data:e})=>{const t=e.mdx;let n="";return t.frontmatter&&t.frontmatter.featuredImage&&(n=t.frontmatter.featuredImage.childImageSharp.gatsbyImageData.images.fallback.src),l.createElement(c.A,{title:t.frontmatter.title,description:t.frontmatter.description||t.excerpt,twitterCard:n})}}}]);
//# sourceMappingURL=component---src-templates-blog-post-tsx-content-file-path-content-blog-reproducible-comparison-builds-index-md-3dc7e6ea8afb61f8efd5.js.map