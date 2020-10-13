import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MainText from './../components/mainText'
import './../components/font.css'

const IndexPage = ({ data }) => {

  return (
    <Layout>
      <SEO title="Home" />
      <MainText data={data.allStrapiDescription.nodes}/>
    </Layout>
  )
}

export default IndexPage


export const pageQuery = graphql`
  query MyQuery {
    allStrapiDescription {
      nodes {
        sentence
        id
        alternative
      }
    }
  }
`