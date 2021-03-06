import React from 'react';
import { graphql } from 'gatsby';
import { withStyles } from '@material-ui/core';
import withRoot from '../utils/withRoot';
import SEO from '../components/seo';
import Layout from '../components/layout';

// Page Components
import Showcase from '../components/index/showcase';
import LearnMore from '../components/index/learnMore';
import Description from '../components/index/description';
import Tags from '../components/index/tags';

const styles = theme => ({
  tags: {
    background: theme.palette.background.paper,
  },
});

const Index = ({ data, classes, showProgress }) => {
  const showcaseData = data.contentfulHomePage;
  const tagSections = data.allContentfulHomeTagSection.edges;
  const { tagsIntro } = data.contentfulHomePage;
  return (
    <>
      <SEO title="Home" />
      <Layout showProgress={showProgress}>
        <Showcase showcaseData={showcaseData} />
        <LearnMore />
        <div className={classes.tags}>
          <Description intro={tagsIntro.childMarkdownRemark.html} />
        </div>
        <Tags
          sections={tagSections}
        />
      </Layout>
    </>
  );
};

export default withRoot(withStyles(styles)(Index));

export const query = graphql`
  query {
    contentfulHomePage {
      welcomeImages {
        title
        fluid(maxWidth: 2000) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      primaryMessage
      secondaryMessage
      tagsIntro {
        childMarkdownRemark {
          html
        }
      }
    }

    allContentfulHomeTagSection(sort: { fields: [order], order: ASC }) {
      totalCount
      edges {
        node {
          title
          description
          associatedPictures {
            title
            description
            fixed(width: 265, height: 200) {
              ...GatsbyContentfulFixed_withWebp
            }
          }
        }
      }
    }
  }
`;
