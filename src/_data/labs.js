const contentful = require('contentful');

const { documentToHtmlString } = require('@contentful/rich-text-html-renderer'); 

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

module.exports = async () => {
  return client.getEntries({ content_type: 'labs', order: 'sys.createdAt'})
  .then(function(response){
    return response.items.map(labs => ({
      title: labs.fields.title,
      content:documentToHtmlString(labs.fields.content),
    }));
  }).catch(console.error)
  
};
