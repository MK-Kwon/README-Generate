function generateMarkdown(data) {
    return `
  # ${data.title}
  ![GitHub All Releases](https://img.shields.io/github/downloads/${data.username}/${data.title}/total)
  
  ## Description
  
  ${data.desc}
  
  
  ## Table of Contents
  * [Description](##Description)
  * [Installation](##Installation)
  * [Usage](##Usage)
  * [License](##License)
  * [Contributing](##Contributing)
  * [Tests](##Tests)
  * [Questions](##Questions)
  
  
  ## Installation
  
  ${data.install}
  
  
  ## Usage
  
  ${data.usage}
  
  
  ## License
  
  ![GitHub license](https://img.shields.io/badge/license-${data.license}-blue.svg)
  
  
  ## Contributing
  
  ${data.credits}
  
  
  ## Tests
  
  ${data.tests}
  
  
  ## Questions
  
  ![User's Avatar](${data.avatarUrl})
  ${data.email}
  
  `;
  }
  
  module.exports = {generateMarkdown};
  