import * as React from "react"
import { graphql } from "gatsby"
import { Link, useI18next, Trans, useTranslation } from "gatsby-plugin-react-i18next"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const {languages, originalPath} = useI18next();
  const { t } = useTranslation()
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { nodes: posts, totalCount } = data.allMarkdownRemark
  const { html = "" } = data.markdownRemark || {}
  const readmeHtml = html?.replace(/<h1.*<\/h1>/, "")

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <Trans>Hello</Trans>
      <section
        dangerouslySetInnerHTML={{ __html: readmeHtml }}
        itemProp="articleBody"
      />
      <hr />
      <footer>
        <h2>Find more recent articles</h2>
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h3>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h3>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
        {totalCount > posts.length && (
          <a href="./list">
            <h5>All articles...</h5>
          </a>
        )}
      </footer>
      <hr />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { slug: { glob: "/docs/**" } } }
      limit: 4
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        fileAbsolutePath
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
      totalCount
    }
    markdownRemark(fileAbsolutePath: { glob: "**/README.md" }) {
      id
      fileAbsolutePath
      html
    }
  }
`
