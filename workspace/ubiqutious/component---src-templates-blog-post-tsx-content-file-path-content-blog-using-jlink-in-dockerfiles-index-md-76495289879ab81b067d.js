"use strict";(self.webpackChunkadoptium_website=self.webpackChunkadoptium_website||[]).push([[3744],{8472:function(e,n,a){a.r(n),a.d(n,{Head:function(){return v},default:function(){return j},formatDiv:function(){return y}});var t=a(8453),s=a(6540);function o(e){const n=Object.assign({p:"p",a:"a",span:"span",h2:"h2",em:"em",strong:"strong"},(0,t.RP)(),e.components);return s.createElement(s.Fragment,null,s.createElement(n.p,null,"The Eclipse Temurin project is excited to announce that the official docker images for Temurin binaries are now available on ",s.createElement(n.a,{href:"https://hub.docker.com/_/eclipse-temurin"},"Docker Hub"),"."),"\n",s.createElement(n.p,null,"If you were previously using an AdoptOpenJDK JDK image with Ubuntu Focal or CentOS 7 as the base and wish to continue using the Temurin JDK image on the same base, the migration path is very simple. Simply change ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">adoptopenjdk</code>'}})," to ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">eclipse-temurin</code>'}})," and set the distro after the version number in the tag. E.g for Ubuntu Focal and an application called ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">japp.jar</code>'}})," you might write:"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="dockerfile"><pre class="language-dockerfile"><code class="language-dockerfile"><span class="token instruction"><span class="token keyword">FROM</span> eclipse-temurin:11-focal</span>\n<span class="token comment"># Continue with your application deployment</span>\n<span class="token instruction"><span class="token keyword">RUN</span> mkdir /opt/app</span>\n<span class="token instruction"><span class="token keyword">COPY</span> japp.jar /opt/app</span>\n<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"java"</span>, <span class="token string">"-jar"</span>, <span class="token string">"/opt/app/japp.jar"</span>]</span></code></pre></div>'}}),"\n",s.createElement(n.p,null,"If you were using a base image that was not Ubuntu Focal or CentOS 7 you can use docker’s COPY command to bring the JDK into your image. E.g to use a Temurin binary inside a Debian base image:"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="dockerfile"><pre class="language-dockerfile"><code class="language-dockerfile"><span class="token instruction"><span class="token keyword">FROM</span> debian</span>\n<span class="token instruction"><span class="token keyword">ENV</span> JAVA_HOME=/opt/java/openjdk</span>\n<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">eclipse-temurin:11</span></span> <span class="token variable">$JAVA_HOME</span> <span class="token variable">$JAVA_HOME</span></span>\n<span class="token instruction"><span class="token keyword">ENV</span> PATH=<span class="token string">"${JAVA_HOME}/bin:${PATH}"</span></span>\n<span class="token comment"># Continue with your application deployment</span>\n<span class="token instruction"><span class="token keyword">RUN</span> mkdir /opt/app</span>\n<span class="token instruction"><span class="token keyword">COPY</span> japp.jar /opt/app</span>\n<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"java"</span>, <span class="token string">"-jar"</span>, <span class="token string">"/opt/app/japp.jar"</span>]</span></code></pre></div>'}}),"\n",s.createElement(n.h2,null,"What about JRE base images?"),"\n",s.createElement(n.p,null,s.createElement(n.em,null,s.createElement(n.strong,null,"NOTE: This paragraph has been superceded since we are now shipping JREs with 17+ again including docker images - see ",s.createElement(n.a,{href:"https://adoptium.net/blog/2021/12/eclipse-temurin-jres-are-back/"},"https://adoptium.net/blog/2021/12/eclipse-temurin-jres-are-back/")," for the details, however we still recommend using jlink to produce your own cut down java runtimes where possible"))),"\n",s.createElement(n.p,null,"The Eclipse Temurin project produces JRE images for version 8. For JDK 11+ it is possible to use ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">jlink</code>'}})," and produce a custom runtime that works directly with your application:"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="dockerfile"><pre class="language-dockerfile"><code class="language-dockerfile"><span class="token comment"># Example of custom Java runtime using jlink in a multi-stage container build</span>\n<span class="token instruction"><span class="token keyword">FROM</span> eclipse-temurin:11 <span class="token keyword">as</span> jre-build</span>\n\n<span class="token comment"># Create a custom Java runtime</span>\n<span class="token instruction"><span class="token keyword">RUN</span> <span class="token variable">$JAVA_HOME</span>/bin/jlink <span class="token operator">\\</span>\n         --add-modules java.base <span class="token operator">\\</span>\n         --strip-debug <span class="token operator">\\</span>\n         --no-man-pages <span class="token operator">\\</span>\n         --no-header-files <span class="token operator">\\</span>\n         --compress=2 <span class="token operator">\\</span>\n         --output /javaruntime</span>\n\n<span class="token comment"># Define your base image</span>\n<span class="token instruction"><span class="token keyword">FROM</span> debian:buster-slim</span>\n<span class="token instruction"><span class="token keyword">ENV</span> JAVA_HOME=/opt/java/openjdk</span>\n<span class="token instruction"><span class="token keyword">ENV</span> PATH <span class="token string">"${JAVA_HOME}/bin:${PATH}"</span></span>\n<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">jre-build</span></span> /javaruntime <span class="token variable">$JAVA_HOME</span></span>\n\n<span class="token comment"># Continue with your application deployment</span>\n<span class="token instruction"><span class="token keyword">RUN</span> mkdir /opt/app</span>\n<span class="token instruction"><span class="token keyword">COPY</span> japp.jar /opt/app</span>\n<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"java"</span>, <span class="token string">"-jar"</span>, <span class="token string">"/opt/app/japp.jar"</span>]</span></code></pre></div>'}}),"\n",s.createElement(n.p,null,"The ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">--add-modules</code>'}})," command accepts a comma seperated list of modules. To determine which modules you need you can run the following command with your existing JRE:"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash">jdk-11.0.8+10-jre/bin/java --list-modules</code></pre></div>'}}),"\n",s.createElement(n.p,null,"We aren’t completely ruling out creating JRE’s for JDK11+ at this stage, so if a multi-stage dockerfile doesn’t work for you then ",s.createElement(n.a,{href:"https://github.com/adoptium/temurin-build/issues/2683"},"we want to hear your thoughts"),"."))}var r=function(e={}){const{wrapper:n}=Object.assign({},(0,t.RP)(),e.components);return n?s.createElement(n,e,s.createElement(o,e)):o(e)},l=a(4755),p=a(1197),c=a(5895),i=a(8297),u=a(720),m=a(9694),d=a(548),k=a(1169),g=a(1939),h=a(9122),E=a(279);function f(){return f=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var t in a)({}).hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e},f.apply(null,arguments)}const y=e=>e.dangerouslySetInnerHTML.__html.includes('class="language-text"')?s.createElement("code",e):s.createElement("div",e),b={GuestPost:m.A,blockquote:e=>s.createElement("blockquote",f({style:{paddingLeft:"1.5rem",borderLeft:".3rem solid hsla(0,0%,0%,0.9)"},className:"blockquote"},e)),table:e=>s.createElement("table",f({className:"table table-hover"},e)),thead:e=>s.createElement("thead",f({className:"table-dark"},e)),li:e=>s.createElement("li",f({style:{marginBottom:"1.5em"}},e)),img:e=>s.createElement(E.A,e),div:y},w=({data:e,pageContext:n,location:a,children:o})=>{const r=e.mdx,{previous:c,next:m}=n,E=u[r.frontmatter.author],f=r.frontmatter.tags;return s.createElement(p.A,null,s.createElement("section",{className:"py-5 container"},s.createElement("div",{className:"row py-lg-5"},s.createElement("div",{className:"col-lg-9 col-md-9 mx-auto"},s.createElement("article",null,s.createElement("header",{className:"pb-5"},s.createElement("h1",{className:"mb-0",style:{fontWeight:"900"}},r.frontmatter.title),s.createElement(d.A,{date:r.frontmatter.date,author:E.name,identifier:r.frontmatter.author}),s.createElement(k.A,{location:a,siteMetadata:e.site.siteMetadata,post:r.frontmatter})),s.createElement(t.xA,{components:b},o),s.createElement(g.A,{tags:f}),s.createElement(h.A,null),s.createElement("hr",{className:"p-3"}),s.createElement("footer",{className:"pb-5"},s.createElement(i.Ay,{identifier:r.frontmatter.author,author:E}))),s.createElement("div",null,s.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},s.createElement("li",null,m&&s.createElement(l.Link,{to:m.fields.postPath,rel:"next"},"← ",m.frontmatter.title)),s.createElement("li",null,c&&s.createElement(l.Link,{to:c.fields.postPath,rel:"prev"},c.frontmatter.title," →"))))))))};function j(e){return s.createElement(w,e,s.createElement(r,e))}const v=({data:e})=>{const n=e.mdx;let a="";return n.frontmatter&&n.frontmatter.featuredImage&&(a=n.frontmatter.featuredImage.childImageSharp.gatsbyImageData.images.fallback.src),s.createElement(c.A,{title:n.frontmatter.title,description:n.frontmatter.description||n.excerpt,twitterCard:a})}}}]);
//# sourceMappingURL=component---src-templates-blog-post-tsx-content-file-path-content-blog-using-jlink-in-dockerfiles-index-md-76495289879ab81b067d.js.map